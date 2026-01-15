import { SearchPetsInput } from "../dtos/search-pets-input.dto";
import { Pet } from "../entities/pet";
import { PetsRepository } from "../repositories/pets.repository";

type SearchPetsUseCaseRequest = SearchPetsInput;

type SearchPetsUseCaseResponse = { pets: Pet[] };

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(request: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCityAndCharacteristics(request);

    return {
      pets,
    };
  }
}
