import { FastifyInstance } from "fastify";
import { createPetController } from "./controllers/create-pet.controller";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/", createPetController);
}
