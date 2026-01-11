import { FastifyInstance } from "fastify";
import { AppError } from "@/lib/errors/app-error";
import z from "zod";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Validation error",
        issues: z.treeifyError(error),
      });
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message,
        code: error.code,
      });
    }

    request.log.error(error);

    return reply.status(500).send({
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  });
}
