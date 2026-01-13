import { OrgCreateData } from "../dtos/org-create-input.dto";
import { Org } from "../entities/org";

export interface OrgsRepository {
  create(data: OrgCreateData): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
}
