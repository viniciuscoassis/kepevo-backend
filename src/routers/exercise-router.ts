import {
  getWeightHistoryById,
  postExercise,
} from "@/controllers/exercise-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ExerciseRouter = Router();

ExerciseRouter.all("/*", authenticateToken);
ExerciseRouter.post("/", postExercise);
ExerciseRouter.get("/weight/:id", getWeightHistoryById);

export { ExerciseRouter };
