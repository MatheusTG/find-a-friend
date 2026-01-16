import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory-pets.repository";
import { FindPetByIdUseCase } from "../use-cases/find-pet-by-id.use-case";
import { ResourceNotFoundError } from "@/lib/errors/resource-not-found.error";

let petsRepository: InMemoryPetsRepository;
let sut: FindPetByIdUseCase;

describe("Find Pets By Id Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new FindPetByIdUseCase(petsRepository);
  });

  it("should be able to find pets by id", async () => {
    const createdPet = await petsRepository.create({
      orgId: "org-1",
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
