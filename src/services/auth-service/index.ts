import usersRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import { invalidBodyError } from "./error";
import bcrypt from "bcrypt";

async function signIn(body: SignInType) {
  const user = await getUserOrFail(body.email);

  await validatePasswordOrFail(body.password, user.password);
  return user;
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
