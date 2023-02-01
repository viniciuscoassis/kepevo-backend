import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { PrismaClient, User } from "@prisma/client";
import { prisma } from "@/config";
import { CreateUserType } from "@/services/users-service";

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}
export async function createAndInit(data: CreateUserType) {
  return prisma.$transaction(async (tx: PrismaClient) => {
    const user = await tx.user.create({
      data,
    });

    await tx.workout.createMany({
      data: [
        {
          title: "treinoA",
          userId: user.id,
        },
        {
          title: "treinoB",
          userId: user.id,
        },
        {
          title: "treinoC",
          userId: user.id,
        },
        {
          title: "treinoD",
          userId: user.id,
        },
        {
          title: "treinoE",
          userId: user.id,
        },
      ],
    });
    return user;
  });
}
