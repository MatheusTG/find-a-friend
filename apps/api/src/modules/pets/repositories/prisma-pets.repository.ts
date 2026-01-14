import { prisma } from "@/lib/prisma";
import { PetCreateInput } from "../dtos/pet-create-input.dto";
import { PetsRepository } from "./pets.repository";

export class PrismaPetsRepository implements PetsRepository {
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
}
