import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory-pets.repository";
import { SearchPetsUseCase } from "../use-cases/search-pets.use.case";

let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;

describe("Find Pets By City Use Case", () => {
  beforeEach(() => {
    const orgCityMap = new Map([["org-1", "Campo Mourão"]]);

    petsRepository = new InMemoryPetsRepository(orgCityMap);
    sut = new SearchPetsUseCase(petsRepository);
  });

  it("should be able to find pets by city", async () => {
    await petsRepository.create({
      orgId: "org-1",
      name: "Thor",
      description: "Friendly and playful dog, great with kids",
      age: "ADULT",
      size: "LARGE",
      energyLevel: "FOUR",
      independenceLevel: "THREE",
      additionalCharacteristics: "Vaccinated, neutered",
    });

    await petsRepository.create({
      orgId: "org-1",
      name: "Betoven",
      description: "Friendly and playful dog, great with kids",
      age: "ADULT",
      size: "LARGE",
      energyLevel: "FOUR",
      independenceLevel: "THREE",
      additionalCharacteristics: "Vaccinated, neutered",
    });

    const { pets } = await sut.execute({ city: "Campo Mourão" });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ name: "Thor" }),
      expect.objectContaining({ name: "Betoven" }),
    ]);
  });

  it("should not return pets from other cities", async () => {
    await petsRepository.create({
      orgId: "org-1",
      name: "Thor",
      description: "Friendly and playful dog, great with kids",
      age: "ADULT",
      size: "LARGE",
      energyLevel: "FOUR",
      independenceLevel: "THREE",
      additionalCharacteristics: "Vaccinated, neutered",
    });

    await petsRepository.create({
      orgId: "org-1",
      name: "Betoven",
      description: "Friendly and playful dog, great with kids",
      age: "ADULT",
      size: "LARGE",
      energyLevel: "FOUR",
      independenceLevel: "THREE",
      additionalCharacteristics: "Vaccinated, neutered",
    });

    const { pets } = await sut.execute({ city: "Araruna" });

    expect(pets).toHaveLength(0);
  });

  it("should be able to find pets by characteristics", async () => {
    await petsRepository.create({
      orgId: "org-1",
      name: "Thor",
      description: "Friendly and playful dog, great with kids",
      age: "ADULT",
      size: "LARGE",
      energyLevel: "FOUR",
      independenceLevel: "THREE",
      additionalCharacteristics: "Vaccinated, neutered",
    });

    await petsRepository.create({
      orgId: "org-1",
      name: "Betoven",
      description: "Friendly and playful dog, great with kids",
      age: "JUNIOR",
      size: "SMALL",
      energyLevel: "FIVE",
      independenceLevel: "TWO",
      additionalCharacteristics: "Trained, vaccinated",
    });

    const { pets } = await sut.execute({ city: "Campo Mourão", age: "JUNIOR", size: "SMALL" });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ name: "Betoven" })]);
  });
});
