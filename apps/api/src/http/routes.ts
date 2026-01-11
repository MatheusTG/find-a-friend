import { FastifyInstance } from "fastify";
import { orgsRoutes } from "@/modules/orgs/orgs.routes";

export async function registerRoutes(app: FastifyInstance) {
  app.register(orgsRoutes, {
    prefix: "/orgs",
  });
}
