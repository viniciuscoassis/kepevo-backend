import { AuthenticatedRequest } from "@/middlewares";
import workoutService from "@/services/workout-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import status from "http-status";

export async function getWorkouts(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const workouts = await workoutService.findAllWorkoutsByUserId(userId);
    return res.status(httpStatus.OK).send(workouts);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(status.UNAUTHORIZED);
  }
}
