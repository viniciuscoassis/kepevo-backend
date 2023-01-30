import { NewExerciseType } from "@/protocols/newExercise";
import { ExerciseService } from "@/services/exercise-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postExercise(req: Request, res: Response) {
  const body = req.body;
  try {
    const newExercise = await ExerciseService.createExercise(body);

    if (!newExercise) return res.sendStatus(httpStatus.BAD_REQUEST);

    return res.status(httpStatus.CREATED).send(newExercise);
  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
