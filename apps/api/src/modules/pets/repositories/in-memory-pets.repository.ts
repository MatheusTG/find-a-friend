import { randomUUID } from "node:crypto";
import { Pet } from "../entities/pet";
import { PetsRepository } from "./pets.repository";
import { PetCreateInput } from "../dtos/pet-create-input.dto";
import { SearchPetsInput } from "../dtos/search-pets-input.dto";

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

  async findManyByCityAndCharacteristics(params: SearchPetsInput): Promise<Pet[]> {
    return this.items.filter((pet) => {
      if (this.orgCityMap?.get(pet.orgId) !== params.city) {
        return false;
      }

      if (params.age && pet.age !== params.age) return false;
      if (params.size && pet.size !== params.size) return false;
      if (params.energyLevel && pet.energyLevel !== params.energyLevel) return false;
      if (params.independenceLevel && pet.independenceLevel !== params.independenceLevel)
        return false;

      if (params.search) {
        const search = params.search.toLowerCase();

        const matches =
          pet.name.toLowerCase().includes(search) ||
          pet.description?.toLowerCase().includes(search);

        if (!matches) return false;
      }

      return true;
    });
  }
}
