import { PrismaPetsRepository } from "../repositories/prisma-pets.repository";
import { FindPetsUseCase } from "../use-cases/find-pets.use.case";

export function MakeFindPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const useCase = new FindPetsUseCase(prismaPetsRepository);

  return useCase;
}
