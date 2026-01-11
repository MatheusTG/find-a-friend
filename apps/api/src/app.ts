import fastify from "fastify";
import { registerRoutes } from "./http/routes";

export async function createApp() {
  const app = fastify({
    logger: true,
  });

  await registerRoutes(app);

  return app;
}
