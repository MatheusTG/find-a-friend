import { Pet } from "../entities/pet";

export type SearchPetsInput = Partial<
  Pick<Pet, "age" | "size" | "energyLevel" | "independenceLevel">
> & {
  city: string;
  search?: string;
};
