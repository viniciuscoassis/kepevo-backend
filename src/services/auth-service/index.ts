import usersRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import { invalidBodyError } from "./error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sessionRepository from "@/repositories/session-repository";
import { exclude } from "@/utils/prisma-utils";

async function signIn(body: SignInType) {
  const user = await getUserOrFail(body.email);

  await validatePasswordOrFail(body.password, user.password);

  const token = await createSession(user.id);

  return { user: exclude(user, "password"), token };
}

async function getUserOrFail(email: string): Promise<GerUserOrFail> {
  const user = await usersRepository.findByEmail(email, {
    id: true,
    email: true,
    password: true,
  });
  if (!user) throw invalidBodyError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  try {
    await sessionRepository.createSession({
      userId,
      token,
    });

    return token;
  } catch (err) {
    console.log(err);
  }
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidBodyError();
}

export type SignInType = Pick<User, "email" | "password">;
type GerUserOrFail = Pick<User, "id" | "email" | "password">;

const authService = {
  signIn,
};

export default authService;
