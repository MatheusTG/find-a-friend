import { PrismaOrgsRepository } from "@/modules/orgs/repositories/prisma-orgs.repository";
import { CreatePetUseCase } from "../use-cases/create-pet.use-case";
import { PrismaPetsRepository } from "../repositories/prisma-pets.repository";

export function MakeCreatePetUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const prismaPetsRepository = new PrismaPetsRepository();
  const useCase = new CreatePetUseCase(prismaOrgsRepository, prismaPetsRepository);

  return useCase;
}
