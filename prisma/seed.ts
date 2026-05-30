import { Prisma } from "@/generated/prisma/browser";
import "dotenv/config";
import { prisma } from "@/lib/prisma";

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Bob",
    matricula: "bob@prisma.io",
    password: "1234567"
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();