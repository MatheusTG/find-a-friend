import { PrismaPetsRepository } from "../repositories/prisma-pets.repository";
import { UpdatePetUseCase } from "../use-cases/update-pet.use-case";

export function makeUpdatePetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const useCase = new UpdatePetUseCase(prismaPetsRepository);

  return useCase;
}
