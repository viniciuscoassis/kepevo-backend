import { notFoundError } from "@/errors/not-found-error";
import workoutRepository from "@/repositories/workout-repository";
import { createInitError } from "./error";

export async function createInit(userId: number) {
  try {
    const existingWorkouts = workoutRepository.findAllByUser(userId);
    if (existingWorkouts) throw createInitError();
    await workoutRepository.createInit(userId);
  } catch (err) {
    throw createInitError();
  }
}

export async function findAllWorkoutsByUserId(userId: number) {
  const workouts = workoutRepository.findAllByUser(userId);

  if (!workouts) throw notFoundError();
  return workouts;
}

const workoutService = {
  createInit,
  findAllWorkoutsByUserId,
};

export default workoutService;
