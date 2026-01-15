import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeFindPetByIdUseCase } from "../factories/make-find-pet-by-id-use-case";

export async function findPetByIdController(request: FastifyRequest, reply: FastifyReply) {
  const findPetByIdUseCaseParamsSchema = z.object({
    id: z.string(),
  });

  const requestParamsData = findPetByIdUseCaseParamsSchema.parse(request.params);

  const findPetByIdUseCase = MakeFindPetByIdUseCase();
  const { pet } = await findPetByIdUseCase.execute({
    petId: requestParamsData.id,
  });

  return reply.status(200).send({
    pet,
  });
}
