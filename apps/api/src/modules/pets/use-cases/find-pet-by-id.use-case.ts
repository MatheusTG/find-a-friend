import { ResourceNotFoundError } from "@/lib/errors/resource-not-found.error";
import { Pet } from "../entities/pet";
import { PetsRepository } from "../repositories/pets.repository";

type FindPetByIdUseCaseRequest = {
  petId: string;
};

type FindPetByIdUseCaseResponse = { pet: Pet };

export class FindPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(request: FindPetByIdUseCaseRequest): Promise<FindPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(request.petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return {
      pet,
    };
  }
}
