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
    energy_level: z.enum(Object.values(EnergyLevel)),
    independence_level: z.enum(Object.values(IndependenceLevel)),
    additional_characteristics: z.string().nullable(),
  });

  const requestData = createPetBodySchema.parse(request.body);

  const createPetUseCase = MakeCreatePetUseCase();
  await createPetUseCase.execute({ org_id: request.user.sub, ...requestData });

  return reply.status(201).send();
}
