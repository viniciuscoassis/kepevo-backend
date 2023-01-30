import usersRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import { duplicatedEmailError } from "./errors";
import bcrypt from "bcrypt";

async function postNewUser({ email, password }: CreateUserType): Promise<User> {
  await validateUniqueEmailOrFail(email);

  const hashPassword = await bcrypt.hash(password, 12);
  return usersRepository.create({
    email,
    password: hashPassword,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await usersRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

const usersService = {
  postNewUser,
};

export type CreateUserType = Pick<User, "email" | "password">;

export default usersService;
