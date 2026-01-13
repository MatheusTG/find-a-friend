import { FastifyInstance } from "fastify";
import { createOrgController } from "./controllers/create-org.controller";
import { authenticateController } from "./controllers/authenticate.controller";
import { refreshController } from "./controllers/refresh.controller";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/", createOrgController);
  app.post("/auth", authenticateController);

  app.patch("/token/refresh", refreshController);
}
