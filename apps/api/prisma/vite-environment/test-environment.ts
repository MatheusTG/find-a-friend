import "dotenv/config";

import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { Environment } from "vitest/environments";
import { PrismaClient } from "@/generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  viteEnvironment: "ssr",
  async setup() {
    const schema = "e2e_" + randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;
    process.env.DATABASE_SCHEMA = schema;

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      options: `-c search_path=${schema || "public"}`,
    });
    const adapter = new PrismaPg(pool, { schema: schema || "public" });

    const prisma = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["query"] : [],
    });

    execSync(`DATABASE_SCHEMA=${schema} pnpm exec prisma migrate deploy`, {
      stdio: "pipe",
    });

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);

        await prisma.$disconnect();
      },
    };
  },
};
