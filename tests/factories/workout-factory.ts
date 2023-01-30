import { prisma } from "@/config";

export function createWorkout(id: number, title: string) {
  return prisma.workout.create({
    data: {
      title: title,
      userId: id,
    },
  });
}
