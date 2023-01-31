import { getWorkouts, renameWorkout } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const WorkoutRouter = Router();

WorkoutRouter.all("/*", authenticateToken);
WorkoutRouter.get("/", getWorkouts);
WorkoutRouter.put("/id", renameWorkout);

export { WorkoutRouter };
