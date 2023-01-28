import { postExercise } from "@/controllers/exercise-controller";
import { Router } from "express";

const ExerciseRouter = Router();

ExerciseRouter.post("/", postExercise);

export { ExerciseRouter };
