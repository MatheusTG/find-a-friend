import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeFindPetsUseCase } from "../factories/make-find-pets-use-case";
import { EnergyLevel, IndependenceLevel, PetAge, PetSize } from "../entities/pet";

export async function findPetsController(request: FastifyRequest, reply: FastifyReply) {
  const findPetsUseCaseParamsSchema = z.object({
    city: z.string(),
  });

  const findPetsUseCaseQuerySchema = z.object({
    search: z.string().optional(),
    age: z.enum(Object.values(PetAge)).optional(),
    size: z.enum(Object.values(PetSize)).optional(),
    energyLevel: z.enum(Object.values(EnergyLevel)).optional(),
    independenceLevel: z.enum(Object.values(IndependenceLevel)).optional(),
  });

  const requestParamsData = findPetsUseCaseParamsSchema.parse(request.params);
  const requestQueryData = findPetsUseCaseQuerySchema.parse(request.query);

  const findPetsUseCase = MakeFindPetsUseCase();
  const { pets } = await findPetsUseCase.execute({
    ...requestParamsData,
    ...requestQueryData,
  });

  return reply.status(200).send({
    pets,
  });
}
