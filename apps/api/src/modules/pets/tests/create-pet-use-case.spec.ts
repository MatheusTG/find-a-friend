import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory-pets.repository";
import { CreatePetUseCase } from "../use-cases/create-pet.use-case";
import { InMemoryOrgsRepository } from "@/modules/orgs/repositories/in-memory-orgs.repository";
import { ResourceNotFoundError } from "@/lib/errors/resource-not-found.error";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(orgsRepository, petsRepository);
  });

  it("should be able to create a new pet", async () => {
    const org = await orgsRepository.create({
      number: "123",
      name: "ONG Amigos dos Pets",
      email: "contato@amigosdospets.org",
      passwordHash: "123456",
      phone: "41999999999",
      state: "Paraná",
      city: "Campo Mourão",
      neighborhood: "Centro",
      street: "Rua das Flores, 123",
      complement: "Sala 2",
    });

    const { pet } = await sut.execute({
      orgId: org.id,
      name: "Thor",
      description: "Friendly and playful dog, great with kids",
      age: "ADULT",
      size: "LARGE",
      energyLevel: "FOUR",
      independenceLevel: "THREE",
      additionalCharacteristics: "Vaccinated, neutered",
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able to create a pet with a non existing org", async () => {
    await expect(
      sut.execute({
        orgId: "non-existing-org-id",
        name: "Thor",
        description: "Friendly and playful dog, great with kids",
        age: "ADULT",
        size: "LARGE",
        energyLevel: "FOUR",
        independenceLevel: "THREE",
        additionalCharacteristics: "Vaccinated, neutered",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
