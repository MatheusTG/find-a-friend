import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import request from "supertest";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  city: string = "Campo Mourão"
) {
  const email = `${randomUUID()}@amigosdospets.org`;

  await prisma.org.create({
    data: {
      number: "123",
      name: "ONG Amigos dos Pets",
      email,
      password_hash: await hash("123456", 6),
      phone: "41999999999",
      state: "Paraná",
      city,
      neighborhood: "Centro",
      street: "Rua das Flores, 123",
      complement: "Sala 2",
    },
  });

  const authResponse = await request(app.server).post("/orgs/auth").send({
    email,
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
