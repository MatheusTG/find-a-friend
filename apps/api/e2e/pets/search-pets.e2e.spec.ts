import { createApp } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser";

const app = await createApp();

describe("Search Pets By City E2E Spec", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search pets by city", async () => {
    const { token } = await createAndAuthenticateUser(app, "Campo Mourão");

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
      .get(`/pets/search/Campo Mourão`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(2);
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: "Thor" }),
      expect.objectContaining({ name: "Betoven" }),
    ]);
  });

  it("should be able to search pets by characteristics", async () => {
    const city = "Araruna";
    const { token } = await createAndAuthenticateUser(app, city);

    await request(app.server).post("/pets").set("Authorization", `Bearer ${token}`).send({
      name: "Thor",
      description: "Friendly and playful dog, great with kids",
      age: "ADULT",
      size: "LARGE",
      energyLevel: "THREE",
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
      .get(`/pets/search/${city}?age=ADULT&size=LARGE&energyLevel=FOUR`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
    expect(response.body.pets).toEqual([expect.objectContaining({ name: "Betoven" })]);
  });
});
