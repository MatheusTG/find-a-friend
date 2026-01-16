import { ResourceNotFoundError } from "@/lib/errors/resource-not-found.error";
import { Pet } from "../entities/pet";
import { PetsRepository } from "../repositories/pets.repository";
import { OrgsRepository } from "@/modules/orgs/repositories/orgs.repository";
import { Org } from "@/modules/orgs/entities/org";

type FindPetByIdUseCaseRequest = {
  petId: string;
};

type FindPetByIdUseCaseResponse = { pet: Pet & { org: Omit<Org, "passwordHash"> } };

export class FindPetByIdUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository
  ) {}

  async execute(request: FindPetByIdUseCaseRequest): Promise<FindPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(request.petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    const org = await this.orgsRepository.findById(pet.orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    const { passwordHash: _, ...orgDataWithoutPasswordHash } = org;

    return {
      pet: {
        ...pet,
        org: orgDataWithoutPasswordHash,
      },
    };
  }
}
