import authService from "@/services/auth-service";
import usersService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postSignIn(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const response = await authService.signIn({ email, password });

    return res.status(httpStatus.OK).send(response);
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
