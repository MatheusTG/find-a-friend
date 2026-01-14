import { EnergyLevel, IndependenceLevel, PetAge, PetSize } from "../entities/pet";

export type PetCreateInput = {
  orgId: string;
  name: string;
  description: string;
  age: PetAge;
  size: PetSize;
  energyLevel: EnergyLevel;
  independenceLevel: IndependenceLevel;
  additionalCharacteristics: string | null;
};
