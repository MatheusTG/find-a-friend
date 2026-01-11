import fastify from "fastify";
import { registerRoutes } from "./http/routes";

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

  await registerRoutes(app);

  return app;
}
