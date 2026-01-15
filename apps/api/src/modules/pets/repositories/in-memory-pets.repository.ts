import { randomUUID } from "node:crypto";
import { Pet } from "../entities/pet";
import { PetsRepository } from "./pets.repository";
import { PetCreateInput } from "../dtos/pet-create-input.dto";
import { FindPetsInput } from "../dtos/find-pets-input.dto";

type OrgCityMap = Map<string, string>;

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private orgCityMap?: OrgCityMap) {}

  async create(data: PetCreateInput) {
    const org: Pet = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
    };

    this.items.push(org);

    return org;
  }

  async findManyByCityAndCharacteristics(params: FindPetsInput): Promise<Pet[]> {
    return this.items.filter((pet) => this.orgCityMap?.get(pet.orgId) === params.city);
  }
}
