import { getWorkouts, renameWorkout } from "@/controllers";
import { Router } from "express";

const WorkoutRouter = Router();

WorkoutRouter.get("/", getWorkouts);
WorkoutRouter.put("/id", renameWorkout);

export { WorkoutRouter };
