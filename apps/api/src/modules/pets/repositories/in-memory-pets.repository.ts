import { randomUUID } from "node:crypto";
import { Pet } from "../entities/pet";
import { PetsRepository } from "./pets.repository";
import { PetCreateInput } from "../dtos/pet-create-input.dto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];
  async create(data: PetCreateInput) {
    const org: Pet = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
    };

    this.items.push(org);

    return org;
  }
}
