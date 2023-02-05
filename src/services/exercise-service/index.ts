import { notFoundError } from "@/errors/not-found-error";
import { NewExerciseType } from "@/protocols/newExercise";
import { exerciseRepository } from "@/repositories/exercise-repository";

export async function createExercise(body: NewExerciseType) {
  try {
    const newExercise = await exerciseRepository.upsert(body);
    return newExercise;
  } catch (err) {
    throw notFoundError();
  }
}

export async function findWeightHistory(id: number) {
  try {
    const history = await exerciseRepository.findWightHistoryById(id);
    return history;
  } catch (err) {
    throw notFoundError();
  }
}

const ExerciseService = {
  createExercise,
  findWeightHistory,
};

export { ExerciseService };
