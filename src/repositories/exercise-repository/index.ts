import { NewExerciseType } from "@/protocols/newExercise";
import { prisma } from "@/config";
import { postWeightRegister } from "@/services/exercise-service";
import { Prisma } from "@prisma/client";

async function upsert(body: NewExerciseType) {
  return prisma.workoutExercise.upsert({
    where: { id: body.id || 1 },
    create: body,
    update: body,
  });
}

async function findById(id: Prisma.WorkoutExerciseWhereUniqueInput) {
  return prisma.workoutExercise.findUnique({
    where: id,
  });
}

async function findWightHistoryByExerciseId(
  exerciseId: Prisma.WeightsHistoryWhereInput
) {
  return prisma.weightsHistory.findMany({
    where: exerciseId,
  });
}

export function createWeightRegister(body: postWeightRegister) {
  return prisma.weightsHistory.create({
    data: body,
  });
}

const exerciseRepository = {
  upsert,
  findById,
  findWightHistoryByExerciseId,
  createWeightRegister,
};

export { exerciseRepository };
