import { notFoundError } from "@/errors/not-found-error";
import { NewExerciseType } from "@/protocols/newExercise";
import { exerciseRepository } from "@/repositories/exercise-repository";
import { BAD_REQUEST } from "http-status";

export async function createExercise(body: NewExerciseType) {
  try {
    const newExercise = await exerciseRepository.upsert(body);
    return newExercise;
  } catch (err) {
    throw notFoundError();
  }
}

const ExerciseService = {
  createExercise,
};

export { ExerciseService };
