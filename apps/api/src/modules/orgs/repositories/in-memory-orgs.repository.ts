import { randomUUID } from "node:crypto";
import { OrgCreateData } from "../dtos/org-create-input.dto";
import { Org } from "../entities/org";
import { OrgsRepository } from "./orgs.repository";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];
  async create(data: OrgCreateData) {
    const org: Org = {
      ...data,
      id: randomUUID(),
      created_at: new Date(),
    };

    this.items.push(org);

    return org;
  }

  async findById(id: string) {
    return this.items.find((item) => item.email === id) || null;
  }

  async findByEmail(email: string) {
    return this.items.find((item) => item.email === email) || null;
  }
}
