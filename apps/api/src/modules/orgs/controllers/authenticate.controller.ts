import { FastifyReply, FastifyRequest } from "fastify";
import { MakeAuthenticateUseCase } from "../factories/make-authenticate-use-case";
import z from "zod";
import { env } from "@/env";

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
  const AauthenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const requestData = AauthenticateBodySchema.parse(request.body);

  const authenticateUseCase = MakeAuthenticateUseCase();

  const { org } = await authenticateUseCase.execute(requestData);

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: org.id,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: org.id,
        expiresIn: "7d",
      },
    }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .status(200)
    .send({
      token,
    });
}
