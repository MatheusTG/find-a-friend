import { PrismaPetsRepository } from "../repositories/prisma-pets.repository";
import { SearchPetsUseCase } from "../use-cases/search-pets.use-case";

export function makeSearchPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const useCase = new SearchPetsUseCase(prismaPetsRepository);

  return useCase;
}
