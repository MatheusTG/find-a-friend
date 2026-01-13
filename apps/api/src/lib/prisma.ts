import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { env } from "../env/index";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  options: `-c search_path=${env.DATABASE_SCHEMA || "public"}`,
});
const adapter = new PrismaPg(pool, { schema: env.DATABASE_SCHEMA || "public" });

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === "development" ? ["query"] : [],
});
