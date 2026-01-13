import { PrismaOrgsRepository } from "../repositories/prisma-orgs.repository";
import { CreateOrgUseCase } from "../use-cases/create-org.use-case";

export function MakeCreateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const useCase = new CreateOrgUseCase(prismaOrgsRepository);

  return useCase;
}
