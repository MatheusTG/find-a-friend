import { createApp } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

const app = await createApp();

describe("Logout Org E2E Spec", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to logout", async () => {
    await prisma.org.create({
      data: {
        number: "123",
        name: "ONG Amigos dos Pets",
        email: "contato@amigosdospets.org",
        password_hash: await hash("123456", 6),
        phone: "41999999999",
        state: "Paraná",
        city: "Campo Mourão",
        neighborhood: "Centro",
        street: "Rua das Flores, 123",
        complement: "Sala 2",
      },
    });

    await request(app.server).post("/orgs/auth").send({
      email: "contato@amigosdospets.org",
      password: "123456",
    });

    const response = await request(app.server).post("/orgs/logout");

    expect(response.statusCode).toEqual(204);
  });
});
