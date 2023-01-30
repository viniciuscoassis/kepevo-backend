import workoutService from "@/services/workout-service";
import { Request, Response } from "express";
import status from "http-status";

export async function renameWorkout() {
  try {
    await workoutService.rename();
  } catch (error) {}
}

export async function getWorkouts(req: Request, res: Response) {
  const userId = 2;
  try {
    const workouts = await workoutService.findAllWorkoutsByUserId(userId);
    return res.send(workouts);
  } catch (error) {
    return res.sendStatus(status.UNAUTHORIZED);
  }
}
