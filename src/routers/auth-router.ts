import { postSignIn } from "@/controllers";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post("/login", postSignIn);

export { authenticationRouter };
