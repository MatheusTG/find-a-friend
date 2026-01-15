import { FastifyInstance } from "fastify";
import { createPetController } from "./controllers/create-pet.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { searchPetsController } from "./controllers/search-pets.controller";
import { findPetByIdController } from "./controllers/find-pet-by-id.controller";

export async function petsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/", createPetController);
  app.get("/search/:city", searchPetsController);
  app.get("/:id", findPetByIdController);
}
