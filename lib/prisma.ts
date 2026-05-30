import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var prisma: PrismaClient | undefined;
}

function makePrisma() {
  const connectionString = process.env.DATABASE_URL;

  console.log("[prisma] DATABASE_URL presente:", !!connectionString);

  const adapter = new PrismaPg({
    connectionString,
    ssl: { rejectUnauthorized: false }, // obrigatório no Render
  });

  return new PrismaClient({ adapter });
}

export const prisma = global.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;