import { UnauthorizedError } from "@/lib/errors/unauthorized-error";
import { FastifyRequest } from "fastify";

export async function verifyJWT(request: FastifyRequest) {
  try {
    await request.jwtVerify();
  } catch {
    throw new UnauthorizedError();
  }
}
