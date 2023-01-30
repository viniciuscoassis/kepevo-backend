import { prisma } from "@/config";

export function createUser() {
  return prisma.user.create({
    data: {
      email: "vini@gmail.com",
      password: "vini123",
    },
  });
}
