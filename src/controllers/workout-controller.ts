import { AuthenticatedRequest } from "@/middlewares";
import workoutService from "@/services/workout-service";
import { Request, Response } from "express";
import status from "http-status";

export async function getWorkouts(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const workouts = await workoutService.findAllWorkoutsByUserId(userId);
    return res.send(workouts);
  } catch (error) {
    return res.sendStatus(status.UNAUTHORIZED);
  }
}
