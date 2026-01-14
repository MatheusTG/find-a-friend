import { OrgCreateInput } from "../dtos/org-create-input.dto";
import { Org } from "../entities/org";

export interface OrgsRepository {
  create(data: OrgCreateInput): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
  findById(id: string): Promise<Org | null>;
}
