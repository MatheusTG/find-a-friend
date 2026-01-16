import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory-pets.repository";
import { InMemoryOrgsRepository } from "@/modules/orgs/repositories/in-memory-orgs.repository";
import { UpdatePetUseCase } from "../use-cases/update-pet.use-case";
import { ResourceNotFoundError } from "@/lib/errors/resource-not-found.error";
import { hash } from "bcryptjs";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: UpdatePetUseCase;

describe("Update Pet Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new UpdatePetUseCase(petsRepository);
  });

  it("should be able to update a pet", async () => {
    const org = await orgsRepository.create({
      number: "123",
      name: "ONG Amigos dos Pets",
      email: "contato@amigosdospets.org",
      passwordHash: await hash("123456", 6),
      phone: "41999999999",
      state: "Paraná",
      city: "Campo Mourão",
      neighborhood: "Centro",
      street: "Rua das Flores, 123",
      complement: "Sala 2",
    });

    const previousPet = await petsRepository.create({
      orgId: org.id,
      name: "Thor",
      description: "Friendly and playful dog, great with kids",
      age: "ADULT",
      size: "MEDIUM",
      energyLevel: "FOUR",
      independenceLevel: "THREE",
      additionalCharacteristics: "Vaccinated, neutered",
    });

    const { pet: updatedPet } = await sut.execute({
      petId: previousPet.id,
      orgId: org.id,
      data: {
        name: "Betoven",
        size: "LARGE",
      },
    });

    expect(updatedPet.name).toEqual("Betoven");
    expect(updatedPet.size).toEqual("LARGE");

    expect(updatedPet.age).toEqual("ADULT");
  });

  it("should not be able to update a pet with non existing id", async () => {
    await expect(
      sut.execute({
        petId: "non-existing-pet-id",
        orgId: "org-id",
        data: {
          name: "Betoven",
          size: "LARGE",
        },
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to update a pet's data from another organization", async () => {
    const firstOrganization = await orgsRepository.create({
      number: "123",
      name: "ONG Amigos dos Pets",
      email: "contato@amigosdospets.org",
      passwordHash: await hash("123456", 6),
      phone: "41999999999",
      state: "Paraná",
      city: "Campo Mourão",
      neighborhood: "Centro",
      street: "Rua das Flores, 123",
      complement: "Sala 2",
    });

    const previousPet = await petsRepository.create({
      orgId: firstOrganization.id,
      name: "Thor",
      description: "Friendly and playful dog, great with kids",
      age: "ADULT",
      size: "MEDIUM",
      energyLevel: "FOUR",
      independenceLevel: "THREE",
      additionalCharacteristics: "Vaccinated, neutered",
    });

    const secondOrganization = await orgsRepository.create({
      number: "123",
      name: "ONG Amigos dos Pets",
      email: "email@example.org",
      passwordHash: await hash("123456", 6),
      phone: "41999999999",
      state: "Paraná",
      city: "Campo Mourão",
      neighborhood: "Centro",
      street: "Rua das Flores, 123",
      complement: "Sala 2",
    });

    await expect(
      sut.execute({
        petId: previousPet.id,
        orgId: secondOrganization.id,
        data: {
          name: "Betoven",
          size: "LARGE",
        },
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
