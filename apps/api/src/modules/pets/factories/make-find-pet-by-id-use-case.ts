import { PrismaOrgsRepository } from "@/modules/orgs/repositories/prisma-orgs.repository";
import { PrismaPetsRepository } from "../repositories/prisma-pets.repository";
import { FindPetByIdUseCase } from "../use-cases/find-pet-by-id.use-case";

export function makeFindPetByIdUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const prismaPetsRepository = new PrismaPetsRepository();
  const useCase = new FindPetByIdUseCase(prismaOrgsRepository, prismaPetsRepository);

  return useCase;
}
