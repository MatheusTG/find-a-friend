import { FastifyInstance } from "fastify";
import { createPetController } from "./controllers/create-pet.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { findPetsController } from "./controllers/find-pets.controller";

export async function petsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/", createPetController);
  app.get("/:city", findPetsController);
}
