import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "../repositories/in-memory-orgs.repository";
import { CreateOrgUseCase } from "../use-cases/create-org.use-case";
import { EmailAlreadyExistsError } from "@/lib/errors/email-already-exists.error";
import { compare } from "bcryptjs";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgUseCase;

describe("Create Organization Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  it("should be able to create a new organization", async () => {
    const { org } = await sut.execute({
      number: "123",
      name: "ONG Amigos dos Pets",
      email: "contato@amigosdospets.org",
      password: "123456",
      phone: "41999999999",
      cep: "80000-000",
      neighborhood: "Centro",
      street: "Rua das Flores, 123",
      complement: "Sala 2",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should be able to hash user password upon the registration", async () => {
    const { org } = await sut.execute({
      number: "123",
      name: "ONG Amigos dos Pets",
      email: "contato@amigosdospets.org",
      password: "123456",
      phone: "41999999999",
      cep: "80000-000",
      neighborhood: "Centro",
      street: "Rua das Flores, 123",
      complement: "Sala 2",
    });

    const isPasswordCorrectlyHashed = await compare("123456", org.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to create two users with the same email", async () => {
    await sut.execute({
      number: "123",
      name: "ONG Amigos dos Pets",
      email: "contato@amigosdospets.org",
      password: "123456",
      phone: "41999999999",
      cep: "80000-000",
      neighborhood: "Centro",
      street: "Rua das Flores, 123",
      complement: "Sala 2",
    });

    await expect(
      sut.execute({
        number: "123",
        name: "ONG Amigos dos Pets",
        email: "contato@amigosdospets.org",
        password: "123456",
        phone: "41999999999",
        cep: "80000-000",
        neighborhood: "Centro",
        street: "Rua das Flores, 123",
        complement: "Sala 2",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });
});
