import fastify from "fastify";
import { registerRoutes } from "./http/routes";
import { registerErrorHandler } from "./http/error-handler";

const isDev = process.env.NODE_ENV !== "production";

export async function createApp() {
  const app = fastify({
    logger: isDev
      ? {
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "HH:MM:ss",
              ignore: "pid,hostname",
            },
          },
        }
      : true,
  });

  registerErrorHandler(app);
  await registerRoutes(app);

  return app;
}
