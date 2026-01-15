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
    return this.items.filter((pet) => {
      if (this.orgCityMap?.get(pet.orgId) !== params.city) return false;

      const checks: [boolean, string][] = [
        [!!params.age && pet.age !== params.age, "age"],
        [!!params.size && pet.size !== params.size, "size"],
        [!!params.energyLevel && pet.energyLevel !== params.energyLevel, "energyLevel"],
        [
          !!params.independenceLevel && pet.independenceLevel !== params.independenceLevel,
          "independenceLevel",
        ],
        [
          !!params.search &&
            !(
              pet.name.toLowerCase().includes(params.search.toLowerCase()) ||
              (pet.description?.toLowerCase().includes(params.search.toLowerCase()) ?? false)
            ),
          "search",
        ],
      ];

      return !checks.some(([failed]) => failed);
    });
  }
}
