import fastify from "fastify";
import { registerRoutes } from "./http/routes";
import { registerErrorHandler } from "./http/error-handler";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

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

  app.register(fastifyCookie);
  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: "refreshToken",
      signed: false,
    },
    sign: {
      expiresIn: "10m",
    },
  });

  registerErrorHandler(app);
  await registerRoutes(app);

  return app;
}
