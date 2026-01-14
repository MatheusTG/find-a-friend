import { compare } from "bcryptjs";
import { Org } from "../entities/org";
import { OrgsRepository } from "../repositories/orgs.repository";
import { InvalidCredentialsError } from "@/lib/errors/invalid-credentials.error";

type AuthenticateUseCaseRequest = {
  email: string;
  password: string;
};

type AuthenticateUseCaseResponse = {
  org: Org;
};

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(request: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const { email, password } = request;

    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, org.passwordHash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      org,
    };
  }
}
