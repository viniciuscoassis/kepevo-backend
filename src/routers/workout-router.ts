import { getAllMuscleGroups, getWorkouts } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const WorkoutRouter = Router();

WorkoutRouter.all("/*", authenticateToken);
WorkoutRouter.get("/", getWorkouts);
WorkoutRouter.get("/musclegroups", getAllMuscleGroups);

export { WorkoutRouter };
