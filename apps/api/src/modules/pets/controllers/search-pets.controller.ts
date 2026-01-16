import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeSearchPetsUseCase } from "../factories/make-search-pets-use-case";
import { EnergyLevel, IndependenceLevel, PetAge, PetSize } from "../entities/pet";

export async function searchPetsController(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsUseCaseParamsSchema = z.object({
    city: z.string(),
  });

  const searchPetsUseCaseQuerySchema = z.object({
    search: z.string().optional(),
    age: z.enum(Object.values(PetAge)).optional(),
    size: z.enum(Object.values(PetSize)).optional(),
    energyLevel: z.enum(Object.values(EnergyLevel)).optional(),
    independenceLevel: z.enum(Object.values(IndependenceLevel)).optional(),
  });

  const requestParamsData = searchPetsUseCaseParamsSchema.parse(request.params);
  const requestQueryData = searchPetsUseCaseQuerySchema.parse(request.query);

  const searchPetsUseCase = makeSearchPetsUseCase();
  const { pets } = await searchPetsUseCase.execute({
    ...requestParamsData,
    ...requestQueryData,
  });

  return reply.status(200).send({
    pets,
  });
}
