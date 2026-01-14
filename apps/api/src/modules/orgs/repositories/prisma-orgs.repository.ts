import { prisma } from "@/lib/prisma";
import { OrgsRepository } from "./orgs.repository";
import { OrgCreateInput } from "../dtos/org-create-input.dto";
import { Org as OrgPrisma } from "@/generated/prisma/client";
import { Org } from "../entities/org";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: OrgCreateInput) {
    const org = await prisma.org.create({
      data: {
        password_hash: data.password,
        ...data,
      },
    });

    return this.mapToDomain(org);
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    if (org) {
      return this.mapToDomain(org);
    }

    return null;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    if (org) {
      return this.mapToDomain(org);
    }

    return null;
  }

  private mapToDomain(org: OrgPrisma): Org {
    const { password_hash, created_at, updated_at, ...rest } = org;

    return {
      ...rest,
      passwordHash: password_hash,
      createdAt: created_at,
      updatedAt: updated_at || undefined,
    };
  }
}
