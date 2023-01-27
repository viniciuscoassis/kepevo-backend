import { getWorkouts, renameWorkout } from "@/controllers";
import { Router } from "express";

const workoutRouter = Router();

workoutRouter.get("/", getWorkouts);
workoutRouter.put("/id", renameWorkout);

export { workoutRouter };
