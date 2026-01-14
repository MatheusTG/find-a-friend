import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "../repositories/in-memory-orgs.repository";
import { AuthenticateUseCase } from "../use-cases/authenticate.use-case";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/lib/errors/invalid-credentials.error";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it("should be able to authenticate", async () => {
    const email = "contato@amigosdospets.org";
    const password = "123456";

    orgsRepository.create({
      number: "123",
      name: "ONG Amigos dos Pets",
      email,
      passwordHash: await hash(password, 6),
      phone: "41999999999",
      cep: "80000-000",
      neighborhood: "Centro",
      street: "Rua das Flores, 123",
      complement: "Sala 2",
    });

    const { org } = await sut.execute({
      email,
      password,
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with an incorrect email and a correct password", async () => {
    const password = "123456";

    orgsRepository.create({
      number: "123",
      name: "ONG Amigos dos Pets",
      email: "contato@amigosdospets.org",
      passwordHash: await hash(password, 6),
      phone: "41999999999",
      cep: "80000-000",
      neighborhood: "Centro",
      street: "Rua das Flores, 123",
      complement: "Sala 2",
    });

    await expect(
      sut.execute({
        email: "incorrectEmail@example.com",
        password,
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with an correct email and a incorrect password", async () => {
    const email = "contato@amigosdospets.org";

    orgsRepository.create({
      number: "123",
      name: "ONG Amigos dos Pets",
      email: "contato@amigosdospets.org",
      passwordHash: await hash("123456", 6),
      phone: "41999999999",
      cep: "80000-000",
      neighborhood: "Centro",
      street: "Rua das Flores, 123",
      complement: "Sala 2",
    });

    await expect(
      sut.execute({
        email,
        password: "incorrectPassword",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
