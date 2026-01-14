import { hash } from "bcryptjs";
import { OrgCreateInput } from "../dtos/org-create-input.dto";
import { Org } from "../entities/org";
import { OrgsRepository } from "../repositories/orgs.repository";
import { EmailAlreadyExistsError } from "@/lib/errors/email-already-exists.error";

type CreateOrgUseCaseRequest = OrgCreateInput;

type CreateOrgUseCaseResponse = { org: Org };

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(request: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const { password, email, ...data } = request;

    const orgWithTheSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithTheSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const org = await this.orgsRepository.create({
      ...data,
      email,
      passwordHash,
    });

    return {
      org,
    };
  }
}
