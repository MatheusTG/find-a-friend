import { Pet } from "../entities/pet";

export type PetCreateInput = Omit<Pet, "id" | "createdAt" | "updatedAt">;
