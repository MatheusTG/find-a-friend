import { FastifyInstance } from "fastify";
import { CreateOrgController } from "./controllers/create.controller";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", CreateOrgController);
}
