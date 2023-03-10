import usersService from "@/services/users-service";
import workoutService from "@/services/workout-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const user = await usersService.postNewUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (err) {
    if (err.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(err);
    }
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }
}
