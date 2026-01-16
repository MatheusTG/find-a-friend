import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { EnergyLevel, IndependenceLevel, PetAge, PetSize } from "../entities/pet";
import { makeUpdatePetUseCase } from "../factories/make-update-pet-use-case";

export async function updatePetController(request: FastifyRequest, reply: FastifyReply) {
  const updatePetParamsSchema = z.object({
    id: z.uuid(),
  });

  const updatePetBodySchema = z
    .object({
      name: z.string(),
      description: z.string(),
      age: z.enum(Object.values(PetAge)),
      size: z.enum(Object.values(PetSize)),
      energyLevel: z.enum(Object.values(EnergyLevel)),
      independenceLevel: z.enum(Object.values(IndependenceLevel)),
      additionalCharacteristics: z.string().nullable(),
    })
    .partial();

  const requestParamsData = updatePetParamsSchema.parse(request.params);
  const requestBodyData = updatePetBodySchema.parse(request.body);

  const updatePetUseCase = makeUpdatePetUseCase();

  const { pet } = await updatePetUseCase.execute({
    petId: requestParamsData.id,
    orgId: request.user.sub,
    data: requestBodyData,
  });

  return reply.status(200).send({
    pet,
  });
}
