import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export function createMuscle(name: string) {
  return prisma.muscleGroups.create({
    data: {
      name: name,
    },
  });
}
export function createExercise(workoutId: number, muscleGroupId: number) {
  return prisma.workoutExercise.create({
    data: {
      name: faker.lorem.toString(),
      workoutId,
      muscleGroupId,
    },
  });
}

export function postWeight(exerciseId: number, value: number) {
  return prisma.weightsHistory.create({
    data: { exerciseId, value },
  });
}
