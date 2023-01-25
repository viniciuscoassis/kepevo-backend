import express, {Express} from "express";
import cors from "cors";

import { connectDb, disconnectDB, loadEnv } from "@/config";

loadEnv();

import { workoutRouter } from "@/routers";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/status", (req, res) => res.send("OK!"))
  .use("/workout", workoutRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
