import { Org } from "../entities/org";

export type OrgCreateData = Omit<Org, "id" | "createdAt" | "updatedAt">;
