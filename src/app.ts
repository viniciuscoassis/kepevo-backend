import express, { Express } from "express";
import cors from "cors";

import { connectDb, disconnectDB, loadEnv } from "@/config";

loadEnv();

import { ExerciseRouter, WorkoutRouter } from "@/routers";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/status", (req, res) => res.send("OK!"))
  .use("/workout", WorkoutRouter)
  .use("/exercise", ExerciseRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
