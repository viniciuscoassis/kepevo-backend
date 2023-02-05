import {
  getWeightHistoryById,
  postExercise,
} from "@/controllers/exercise-controller";
import { Router } from "express";

const ExerciseRouter = Router();

ExerciseRouter.post("/", postExercise);
ExerciseRouter.get("/weight/:id", getWeightHistoryById);

export { ExerciseRouter };
