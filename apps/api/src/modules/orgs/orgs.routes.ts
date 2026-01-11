import { FastifyInstance } from "fastify";
import { createOrgController } from "./controllers/create.controller";
import { authenticateController } from "./controllers/authenticate.controller";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/", createOrgController);
  app.post("/auth", authenticateController);
}
