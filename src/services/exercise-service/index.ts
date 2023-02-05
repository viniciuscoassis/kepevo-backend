import { notFoundError } from "@/errors/not-found-error";
import { NewExerciseType } from "@/protocols/newExercise";
import { exerciseRepository } from "@/repositories/exercise-repository";
import { Prisma, WeightsHistory, WorkoutExercise } from "@prisma/client";
import { cantCreateExercise } from "./cant-create-exercise-error";
import { exerciseNotFoundError } from "./exercise-not-found-error";

export async function createExercise(body: NewExerciseType) {
  const newExercise = await exerciseRepository.upsert(body);
  if (!newExercise) throw cantCreateExercise();
  return newExercise;
}

export async function findWeightHistory(body: WeightsHistoryWhereInput) {
  const exercise = await checkExercise({ id: body.exerciseId });
  const history = await exerciseRepository.findWightHistoryByExerciseId({
    exerciseId: exercise.id,
  });
  if (!history) throw notFoundError();
  return history;
}
export async function createWeightRegister(body: postWeightRegister) {
  await checkExercise({ id: body.exerciseId });
  const createdRegister = await exerciseRepository.createWeightRegister(body);

  return createdRegister;
}

async function checkExercise(id: Prisma.WorkoutExerciseWhereUniqueInput) {
  const exercise = await exerciseRepository.findById(id);
  if (!exercise) throw exerciseNotFoundError();
  return exercise;
}

export type WorkoutExerciseFindInput = Omit<
  WorkoutExercise,
  "createdAt" | "updatedAt" | "muscleGroupId" | "workoutId" | "name"
>;

export type WeightsHistoryWhereInput = Omit<
  WeightsHistory,
  "createdAt" | "updatedAt" | "id" | "value"
>;

export type postWeightRegister = Omit<
  WeightsHistory,
  "id" | "createdAt" | "updatedAt"
>;

const ExerciseService = {
  createExercise,
  findWeightHistory,
  createWeightRegister,
};

export { ExerciseService };
