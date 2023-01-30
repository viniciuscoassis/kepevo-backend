import { prisma } from "@/config";

export async function findSessionByUserId(userId: number) {
  return prisma.session.findFirst({
    where: {
      userId,
    },
  });
}
