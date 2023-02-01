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
  try {
    const workouts = await workoutRepository.findAllByUser(userId);
    if (workouts.length === 0) throw notFoundError();
    return workouts;
  } catch (err) {
    throw notFoundError();
  }
}

const workoutService = {
  createInit,
  findAllWorkoutsByUserId,
};

export default workoutService;
