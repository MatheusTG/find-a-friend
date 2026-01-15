import { FindPetsInput } from "../dtos/find-pets-input.dto";
import { Pet } from "../entities/pet";
import { PetsRepository } from "../repositories/pets.repository";

type FindPetsUseCaseRequest = FindPetsInput;

type FindPetsUseCaseResponse = { pets: Pet[] };

export class FindPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(request: FindPetsUseCaseRequest): Promise<FindPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCityAndCharacteristics(request);

    return {
      pets,
    };
  }
}
