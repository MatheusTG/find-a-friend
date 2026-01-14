import { PrismaPetsRepository } from "../repositories/prisma-pets.repository";
import { FindPetsByCityUseCase } from "../use-cases/find-pets-by-city.use.case";

export function MakeFindPetsByCityUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const useCase = new FindPetsByCityUseCase(prismaPetsRepository);

  return useCase;
}
