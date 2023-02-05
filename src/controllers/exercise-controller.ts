import { AuthenticatedRequest } from "@/middlewares";
import { NewExerciseType } from "@/protocols/newExercise";
import { ExerciseService } from "@/services/exercise-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postExercise(req: AuthenticatedRequest, res: Response) {
  const { name, workoutId, muscleGroupId } = req.body;

  try {
    const newExercise = await ExerciseService.createExercise({
      name,
      workoutId: Number(workoutId),
      muscleGroupId: Number(muscleGroupId),
    });

    if (!newExercise) return res.sendStatus(httpStatus.BAD_REQUEST);

    return res.status(httpStatus.CREATED).send(newExercise);
  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
export async function getWeightById(req: AuthenticatedRequest, res: Response) {
  const exerciseId = req.query.id;
  console.log(exerciseId);

  try {
    const newExercise = await ExerciseService.createExercise({
      name,
      workoutId: Number(workoutId),
      muscleGroupId: Number(muscleGroupId),
    });

    if (!newExercise) return res.sendStatus(httpStatus.BAD_REQUEST);

    return res.status(httpStatus.CREATED).send(newExercise);
  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
