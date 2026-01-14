import { createApp } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser";

const app = await createApp();

describe("Create Org E2E Spec", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new pet", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Thor",
        description: "Friendly and playful dog, great with kids",
        age: "ADULT",
        size: "LARGE",
        energyLevel: "FOUR",
        independenceLevel: "THREE",
        additionalCharacteristics: "Vaccinated, neutered",
      });

    expect(response.statusCode).toEqual(201);
  });
});
