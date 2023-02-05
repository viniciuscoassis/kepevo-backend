import { NewExerciseType } from "@/protocols/newExercise";
import { prisma } from "@/config";

async function upsert(body: NewExerciseType) {
  return prisma.workoutExercise.upsert({
    where: { id: body.id || 1 },
    create: body,
    update: body,
  });
}

async function findById(id: number) {
  return prisma.workoutExercise.findUnique({
    where: { id },
  });
}

async function findWightHistoryByExerciseId(exerciseId: number) {
  return prisma.weightsHistory.findMany({
    where: { exerciseId },
  });
}

const exerciseRepository = {
  upsert,
  findById,
  findWightHistoryByExerciseId,
};

export { exerciseRepository };
