import { createApp } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser";

const app = await createApp();

describe("Update Org E2E Spec", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update a pet", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const createPetResponse = await request(app.server)
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

    const updateData = {
      name: "Betoven",
      size: "SMALL",
      energyLevel: "THREE",
    };

    const response = await request(app.server)
      .patch(`/pets/${createPetResponse.body.pet.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateData);

    expect(response.statusCode).toEqual(200);
    expect(response.body.pet).toEqual(expect.objectContaining(updateData));
  });

  it("should not be able to update a pet's data from another organization", async () => {
    const { token: firstOrganizationToken } = await createAndAuthenticateUser(app);

    const createPetResponse = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${firstOrganizationToken}`)
      .send({
        name: "Thor",
        description: "Friendly and playful dog, great with kids",
        age: "ADULT",
        size: "LARGE",
        energyLevel: "FOUR",
        independenceLevel: "THREE",
        additionalCharacteristics: "Vaccinated, neutered",
      });

    const { token: secondOrganizationToken } = await createAndAuthenticateUser(app);

    const updateData = {
      name: "Betoven",
      size: "SMALL",
      energyLevel: "THREE",
    };

    const response = await request(app.server)
      .patch(`/pets/${createPetResponse.body.pet.id}`)
      .set("Authorization", `Bearer ${secondOrganizationToken}`)
      .send(updateData);

    expect(response.statusCode).toEqual(404);
  });
});
