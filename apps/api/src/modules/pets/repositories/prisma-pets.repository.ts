import { prisma } from "@/lib/prisma";
import { PetCreateInput } from "../dtos/pet-create-input.dto";
import { PetsRepository } from "./pets.repository";
import { Pet as PetPrisma } from "@/generated/prisma/client";
import { Pet } from "../entities/pet";
import { SearchPetsInput } from "../dtos/search-pets-input.dto";

export class PrismaPetsRepository implements PetsRepository {
  private mapToDomain(pet: PetPrisma): Pet {
    return {
      id: pet.id,
      orgId: pet.org_id,
      name: pet.name,
      description: pet.description,
      age: pet.age,
      size: pet.size,
      energyLevel: pet.energy_level,
      independenceLevel: pet.independence_level,
      additionalCharacteristics: pet.additional_characteristics,
      createdAt: pet.created_at,
      updatedAt: pet.updated_at ?? undefined,
    };
  }

  async update(petId: string, data: Partial<PetCreateInput>): Promise<Pet> {
    const updatedPet = await prisma.pet.update({
      where: { id: petId },
      data,
    });

    return this.mapToDomain(updatedPet);
  }

  async create(data: PetCreateInput) {
    const pet = await prisma.pet.create({
      data: {
        org_id: data.orgId,
        name: data.name,
        description: data.description,
        age: data.age,
        size: data.size,
        energy_level: data.energyLevel,
        independence_level: data.independenceLevel,
        additional_characteristics: data.additionalCharacteristics,
      },
    });

    return this.mapToDomain(pet);
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    });

    if (pet) {
      return this.mapToDomain(pet);
    }

    return null;
  }

  async findManyByCityAndCharacteristics(params: SearchPetsInput) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: params.city,
        },
        age: params.age,
        size: params.size,
        energy_level: params.energyLevel,
        independence_level: params.independenceLevel,
        OR: params.search
          ? [
              { name: { contains: params.search, mode: "insensitive" } },
              { description: { contains: params.search, mode: "insensitive" } },
              { additional_characteristics: { contains: params.search, mode: "insensitive" } },
            ]
          : undefined,
      },
    });

    return pets.map((pet) => this.mapToDomain(pet));
  }
}
