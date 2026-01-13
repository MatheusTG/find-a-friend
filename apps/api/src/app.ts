import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

import { registerRoutes } from "./http/routes";
import { registerErrorHandler } from "./http/error-handler";
import { env } from "./env";

const isDev = env.NODE_ENV === "development";
const isTest = env.NODE_ENV === "test";

function buildLogger() {
  if (isTest) return false;

  if (isDev) {
    return {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss",
          ignore: "pid,hostname",
        },
      },
    };
  }

  return true;
}

export async function createApp() {
  const app = fastify({
    logger: buildLogger(),
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
