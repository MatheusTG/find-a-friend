import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { OrgsRepository } from "./orgs.repository";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const gym = await prisma.org.create({
      data,
    });

    return gym;
  }
}
