import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeFindPetsByCityUseCase } from "../factories/make-find-pets-by-city-use-case";

export async function FindPetsByCityController(request: FastifyRequest, reply: FastifyReply) {
  const findPetsByCityUseCaseParamsSchema = z.object({
    city: z.string(),
  });

  const requestData = findPetsByCityUseCaseParamsSchema.parse(request.params);

  const findPetsByCityUseCase = MakeFindPetsByCityUseCase();
  const pets = await findPetsByCityUseCase.execute(requestData);

  return reply.status(201).send({
    pets,
  });
}
