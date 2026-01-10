import { hash } from "bcryptjs";
import { CreateOrgInput } from "../dtos/create-input.dto";
import { Org } from "../entities/org";
import { OrgsRepository } from "../repositories/orgs.repository";
import { EmailAlreadyExistsError } from "@/lib/errors/email-already-exists.error";

type CreateOrgUseCaseRequest = CreateOrgInput;

type CreateOrgUseCaseResponse = Org;

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(request: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const { password, email, ...data } = request;

    const orgWithTheSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithTheSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    return this.orgsRepository.create({
      ...data,
      email,
      password_hash,
    });
  }
}
