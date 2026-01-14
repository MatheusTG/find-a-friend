import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeCreatePetUseCase } from "../factories/make-create-pet-use-case";
import { EnergyLevel, IndependenceLevel, PetAge, PetSize } from "../entities/pet";

export async function createPetController(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(Object.values(PetAge)),
    size: z.enum(Object.values(PetSize)),
    energyLevel: z.enum(Object.values(EnergyLevel)),
    independenceLevel: z.enum(Object.values(IndependenceLevel)),
    additionalCharacteristics: z.string().nullable(),
  });

  const requestData = createPetBodySchema.parse(request.body);

  const createPetUseCase = MakeCreatePetUseCase();
  const { pet } = await createPetUseCase.execute({ orgId: request.user.sub, ...requestData });

  return reply.status(201).send({
    pet,
  });
}
