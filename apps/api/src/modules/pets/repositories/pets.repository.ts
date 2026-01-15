import { SearchPetsInput } from "../dtos/search-pets-input.dto";
import { PetCreateInput } from "../dtos/pet-create-input.dto";
import { Pet } from "../entities/pet";

export interface PetsRepository {
  create(data: PetCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findManyByCityAndCharacteristics(params: SearchPetsInput): Promise<Pet[]>;
}
