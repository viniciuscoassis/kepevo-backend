import { notFoundError } from "@/errors/not-found-error";
import { NewExerciseType } from "@/protocols/newExercise";
import { exerciseRepository } from "@/repositories/exercise-repository";
import { WeightsHistory, WorkoutExercise } from "@prisma/client";
import { exerciseNotFoundError } from "./exercise-not-found-error";

export async function createExercise(body: NewExerciseType) {
  try {
    const newExercise = await exerciseRepository.upsert(body);
    return newExercise;
  } catch (err) {
    throw notFoundError();
  }
}

export async function findWeightHistory(body: WeightsHistoryWhereInput) {
  try {
    const exercise = await checkExercise({ id: body.exerciseId });
    const history = await exerciseRepository.findWightHistoryByExerciseId({
      exerciseId: exercise.id,
    });

    return history;
  } catch (err) {
    throw notFoundError();
  }
}
export async function createWeightRegister(body: postWeightRegister) {
  try {
    await checkExercise({ id: body.exerciseId });
    const createdRegister = await exerciseRepository.createWeightRegister(body);

    return createdRegister;
  } catch (err) {
    throw notFoundError();
  }
}

async function checkExercise(id: WorkoutExerciseFindInput) {
  try {
    const exercise = await exerciseRepository.findById(id);
    return exercise;
  } catch (err) {
    throw exerciseNotFoundError();
  }
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
