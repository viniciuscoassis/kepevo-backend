import { prisma } from "@/config";
import { CreateUserType } from "@/services/users-service";
import { Prisma } from "@prisma/client";

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

function create(data: CreateUserType) {
  return prisma.user.create({
    data,
  });
}

const usersRepository = {
  findByEmail,
  create,
};

export default usersRepository;
