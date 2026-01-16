import { PrismaPetsRepository } from "../repositories/prisma-pets.repository";
import { FindPetByIdUseCase } from "../use-cases/find-pet-by-id.use-case";

export function makeFindPetByIdUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const useCase = new FindPetByIdUseCase(prismaPetsRepository);

  return useCase;
}
