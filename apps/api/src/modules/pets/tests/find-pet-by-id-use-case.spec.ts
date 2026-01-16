import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory-pets.repository";
import { FindPetByIdUseCase } from "../use-cases/find-pet-by-id.use-case";
import { ResourceNotFoundError } from "@/lib/errors/resource-not-found.error";
import { InMemoryOrgsRepository } from "@/modules/orgs/repositories/in-memory-orgs.repository";
import { hash } from "bcryptjs";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: FindPetByIdUseCase;

describe("Find Pets By Id Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new FindPetByIdUseCase(orgsRepository, petsRepository);
  });

  it("should be able to find pets by id", async () => {
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

    const createdPet = await petsRepository.create({
      orgId: org.id,
      name: "Thor",
      description: "Friendly and playful dog, great with kids",
      age: "ADULT",
      size: "LARGE",
      energyLevel: "FOUR",
      independenceLevel: "THREE",
      additionalCharacteristics: "Vaccinated, neutered",
    });

    const { pet } = await sut.execute({ petId: createdPet.id });

    expect(pet).toEqual(expect.objectContaining({ name: "Thor" }));
  });

  it("should not be able to find a pet using a non-existent id", async () => {
    await expect(sut.execute({ petId: "non-existing-pet-id" })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
