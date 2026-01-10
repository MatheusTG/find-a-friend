import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { CreateOrgUseCase } from "../use-cases/create.use-case";
import { PrismaOrgsRepository } from "../repositories/prisma-orgs.repository";

export async function CreateOrgController(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    number: z.string(),
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    phone: z.string(),
    cep: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    complement: z.string().optional(),
  });

  try {
    const requestData = createOrgBodySchema.parse(request.body);

    const orgsRepository = new PrismaOrgsRepository();
    const createOrgUseCase = new CreateOrgUseCase(orgsRepository);

    await createOrgUseCase.execute(requestData);

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Validation error",
        issues: z.treeifyError(error),
      });
    }

    request.log.error(error);

    throw error;
  }
}
