import { PrismaOrgsRepository } from "../repositories/prisma-orgs.repository";
import { AuthenticateUseCase } from "../use-cases/authenticate.use-case";

export function MakeAuthenticateUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const useCase = new AuthenticateUseCase(prismaOrgsRepository);

  return useCase;
}
