import { prisma } from "@/config";

export function createMuscle(name: string) {
  return prisma.muscleGroups.create({
    data: {
      name: name,
    },
  });
}
