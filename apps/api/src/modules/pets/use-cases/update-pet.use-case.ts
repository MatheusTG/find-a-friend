import { ResourceNotFoundError } from "@/lib/errors/resource-not-found.error";
import { PetCreateInput } from "../dtos/pet-create-input.dto";
import { Pet } from "../entities/pet";
import { PetsRepository } from "../repositories/pets.repository";

type UpdatePetUseCaseRequest = {
  petId: string;
  orgId: string;
  data: Partial<PetCreateInput>;
};

type UpdatePetUseCaseResponse = { pet: Pet };

export class UpdatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(request: UpdatePetUseCaseRequest): Promise<UpdatePetUseCaseResponse> {
    const { petId, orgId, data } = request;

    const previousPet = await this.petsRepository.findById(petId);

    if (!previousPet || previousPet.orgId !== orgId) {
      throw new ResourceNotFoundError();
    }

    const updatedPet = await this.petsRepository.update(petId, data);

    return {
      pet: updatedPet,
    };
  }
}
