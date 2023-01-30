import { notFoundError } from "@/errors/not-found-error";
import workoutRepository from "@/repositories/workout-repository";

export async function rename() {}

export async function findAllWorkoutsByUserId(userId: number) {
  const workouts = workoutRepository.findAllByUser(userId);

  if (!workouts) throw notFoundError();
  return workouts;
}

const workoutService = {
  rename,
  findAllWorkoutsByUserId,
};

export default workoutService;
