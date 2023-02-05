import {
  getWeightHistoryById,
  postExercise,
  postWeightRegister,
} from "@/controllers/exercise-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ExerciseRouter = Router();

ExerciseRouter.all("/*", authenticateToken);
ExerciseRouter.post("/", postExercise);
ExerciseRouter.get("/weight/:id", getWeightHistoryById);
ExerciseRouter.post("/weight", postWeightRegister);

export { ExerciseRouter };
