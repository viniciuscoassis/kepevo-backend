import { prisma } from "@/config";
import { User } from "@prisma/client";
import { createUser } from "./factories/users-factory";
import jwt from "jsonwebtoken";
import { createSession } from "./factories/session-factory";

export async function cleanDb() {
  await prisma.workoutExercise.deleteMany({});
  await prisma.muscleGroups.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.workout.deleteMany({});
  await prisma.user.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}
