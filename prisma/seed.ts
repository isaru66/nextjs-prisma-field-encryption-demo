import { PrismaClient, Prisma } from "@prisma/client";
import { fieldEncryptionExtension } from "prisma-field-encryption";

// Create a simple client instance for seeding
const globalClient = new PrismaClient()

const client = globalClient.$extends(
  fieldEncryptionExtension()
)

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    idCardNo: "10000-10000-001",
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    idCardNo: "10000-10000-002",
  },
  {
    name: "Charlie",
    email: "charlie@prisma.io",
    idCardNo: "10000-10000-003",
  },
  {
    name: "Diana",
    email: "diana@prisma.io",
    idCardNo: "10000-10000-004",
  },
  {
    name: "Edward",
    email: "edward@prisma.io",
    idCardNo: "10000-10000-005",
  },
  {
    name: "Fiona",
    email: "fiona@prisma.io",
    idCardNo: "10000-10000-006",
  },
  {
    name: "George",
    email: "george@prisma.io",
    idCardNo: "10000-10000-007",
  },
  {
    name: "Hannah",
    email: "hannah@prisma.io",
    idCardNo: "10000-10000-008",
  },
  {
    name: "Isaac",
    email: "isaac@prisma.io",
    idCardNo: "10000-10000-009",
  },
  {
    name: "Julia",
    email: "julia@prisma.io",
    idCardNo: "10000-10000-010",
  },
  {
    name: "Kevin",
    email: "kevin@prisma.io",
    idCardNo: "10000-10000-011",
  },
  {
    name: "Luna",
    email: "luna@prisma.io",
    idCardNo: "10000-10000-012",
  },
];

export async function main() {
  for (const u of userData) {
    await client.user.create({ data: u });
  }
}

main()
  .then(() => {
    console.log("Seed process finished.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Unhandled error:", error);
    process.exit(1);
  });
