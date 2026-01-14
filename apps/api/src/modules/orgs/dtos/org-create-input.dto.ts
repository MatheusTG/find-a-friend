import { Org } from "../entities/org";

export type OrgCreateInput = Omit<Org, "id" | "createdAt" | "updatedAt" | "passwordHash"> & {
  password: string;
};
