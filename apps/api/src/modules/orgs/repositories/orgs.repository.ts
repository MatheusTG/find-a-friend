import { CreateOrgData } from "../dtos/create-input.dto";
import { Org } from "../entities/org";

export interface OrgsRepository {
  create(data: CreateOrgData): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
}
