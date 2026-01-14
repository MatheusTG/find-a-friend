import { createApp } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

const app = await createApp();

describe("Create Org E2E Spec", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new organization", async () => {
    const response = await request(app.server).post("/orgs").send({
      number: "123",
      name: "ONG Amigos dos Pets",
      email: "contato@amigosdospets.org",
      password: "123456",
      phone: "41999999999",
      state: "Paraná",
      city: "Campo Mourão",
      neighborhood: "Centro",
      street: "Rua das Flores, 123",
      complement: "Sala 2",
    });

    expect(response.statusCode).toEqual(201);
  });
});
