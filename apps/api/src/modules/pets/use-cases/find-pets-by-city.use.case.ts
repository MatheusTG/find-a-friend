import { Pet } from "../entities/pet";
import { PetsRepository } from "../repositories/pets.repository";

type FindPetsByCityUseCaseRequest = {
  city: string;
};

type FindPetsByCityUseCaseResponse = { pets: Pet[] };

export class FindPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(request: FindPetsByCityUseCaseRequest): Promise<FindPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(request.city);

    return {
      pets,
    };
  }
}
