import { PetCreateInput } from "../dtos/pet-create-input.dto";
import { Pet } from "../entities/pet";

export interface PetsRepository {
  create(data: PetCreateInput): Promise<Pet>;
}
