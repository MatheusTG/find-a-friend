import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "@/env";

export async function logoutController(_: FastifyRequest, reply: FastifyReply) {
  return reply
    .clearCookie("refreshToken", {
      path: "/",
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .status(204)
    .send();
}
