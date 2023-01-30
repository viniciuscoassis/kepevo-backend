import { createUser } from "@/controllers";
import { Router } from "express";

const userRouter = Router();
userRouter.post("/", createUser);

export { userRouter };
