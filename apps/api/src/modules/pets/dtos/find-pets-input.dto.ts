import { Pet } from "../entities/pet";

export type FindPetsInput = Partial<
  Pick<Pet, "age" | "size" | "energyLevel" | "independenceLevel">
> & {
  city: string;
  search?: string;
};
