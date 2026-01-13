import { prisma } from "@/lib/prisma";
import { PetCreateInput } from "../dtos/pet-create-input.dto";
import { PetsRepository } from "./pets.repository";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
