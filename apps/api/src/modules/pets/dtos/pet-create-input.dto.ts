import { EnergyLevel, IndependenceLevel, PetAge, PetSize } from "../entities/pet";

export type PetCreateInput = {
  org_id: string;
  name: string;
  description: string;
  age: PetAge;
  size: PetSize;
  energy_level: EnergyLevel;
  independence_level: IndependenceLevel;
  additional_characteristics: string | null;
};
