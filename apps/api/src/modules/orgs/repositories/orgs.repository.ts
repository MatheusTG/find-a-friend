import { Org } from "@/generated/prisma/client";
import { CreateOrgData } from "../dtos/create-input.dto";

export interface OrgsRepository {
  create(data: CreateOrgData): Promise<Org>;
}
