import { createApp } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser";

const app = await createApp();

describe("Find Pets By City E2E Spec", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new pet", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server).post("/pets").set("Authorization", `Bearer ${token}`).send({
      name: "Thor",
      description: "Friendly and playful dog, great with kids",
      age: "ADULT",
      size: "LARGE",
      energyLevel: "FOUR",
      independenceLevel: "THREE",
      additionalCharacteristics: "Vaccinated, neutered",
    });

    await request(app.server).post("/pets").set("Authorization", `Bearer ${token}`).send({
      name: "Betoven",
      description: "Friendly and playful dog, great with kids",
      age: "ADULT",
      size: "LARGE",
      energyLevel: "FOUR",
      independenceLevel: "THREE",
      additionalCharacteristics: "Vaccinated, neutered",
    });

    const response = await request(app.server)
      .post(`/pets/Campo Mourão`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(2);
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: "Thor" }),
      expect.objectContaining({ name: "Betoven" }),
    ]);
  });
});
