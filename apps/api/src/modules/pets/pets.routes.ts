import { FastifyInstance } from "fastify";
import { createPetController } from "./controllers/create-pet.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FindPetsByCityController } from "./controllers/find-pets-by-city.controller";

export async function petsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/", createPetController);
  app.post("/:city", FindPetsByCityController);
}
