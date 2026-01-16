import { createApp } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser";

const app = await createApp();

describe("Find Pet By Id E2E Spec", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to find pets by id", async () => {
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

    const getPetResponse = await request(app.server)
      .get(`/pets/${createPetResponse.body.pet.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getPetResponse.statusCode).toEqual(200);
    expect(getPetResponse.body.pet).toEqual(expect.objectContaining({ name: "Thor" }));
  });
});
