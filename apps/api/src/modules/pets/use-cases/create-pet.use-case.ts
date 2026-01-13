import { PetCreateInput } from "../dtos/pet-create-input.dto";
import { Pet } from "../entities/pet";
import { OrgsRepository } from "@/modules/orgs/repositories/orgs.repository";
import { PetsRepository } from "../repositories/pets.repository";
import { ResourceNotFoundError } from "@/lib/errors/resource-not-found.error";

type CreatePetUseCaseRequest = PetCreateInput;

type CreatePetUseCaseResponse = { pet: Pet };

export class CreatePetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository
  ) {}

  async execute(request: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(request.org_id);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.create({
      ...request,
    });

    return {
      pet,
    };
  }
}
