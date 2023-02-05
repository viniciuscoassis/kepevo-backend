import { notFoundError } from "@/errors/not-found-error";
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
export async function getWeightHistoryById(
  req: AuthenticatedRequest,
  res: Response
) {
  const exerciseId = req.params.id;
  if (!exerciseId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const weightHistory = await ExerciseService.findWeightHistory(
      Number(exerciseId)
    );

    if (!weightHistory) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(weightHistory);
  } catch (err) {
    if (err.name === "NotFoundError")
      return res.status(httpStatus.NOT_FOUND).send(err.message);
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
