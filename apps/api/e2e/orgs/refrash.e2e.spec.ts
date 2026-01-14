import { createApp } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

const app = await createApp();

describe("Authenticate Org E2E Spec", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
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

    const authResponse = await request(app.server).post("/orgs/auth").send({
      email: "contato@amigosdospets.org",
      password: "123456",
    });

    const cookies = authResponse.get("Set-Cookie");

    if (!cookies) {
      throw new Error("The token does not exist.");
    }

    const response = await request(app.server).patch("/orgs/token/refresh").set("Cookie", cookies);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
