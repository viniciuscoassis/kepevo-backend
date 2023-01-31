import { prisma } from "@/config";
import { CreateUserType } from "@/services/users-service";
import { Prisma, PrismaClient } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}
async function createAndInit(data: CreateUserType) {
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
function create(data: CreateUserType) {
  return prisma.user.create({
    data,
  });
}

const usersRepository = {
  findByEmail,
  create,
  createAndInit,
};

export default usersRepository;
