import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

if (typeof window === "undefined") {
  // Only on server
  const connectionString = process.env.DATABASE_URL;

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter } as any);
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
} else {
  // On client, but shouldn't happen
  prisma = {} as PrismaClient;
}

export { prisma };