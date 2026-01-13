import { FastifyInstance } from "fastify";
import { orgsRoutes } from "@/modules/orgs/orgs.routes";
import { petsRoutes } from "@/modules/pets/pets.routes";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(orgsRoutes, {
    prefix: "/orgs",
  });
  await app.register(petsRoutes, {
    prefix: "/pets",
  });
}
