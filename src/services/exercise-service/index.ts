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

export async function findWeightHistory(exerciseId: number) {
  try {
    const exercise = await exerciseRepository.findById(exerciseId);
    if (!exercise) throw notFoundError();
    const history = await exerciseRepository.findWightHistoryByExerciseId(
      exerciseId
    );

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
