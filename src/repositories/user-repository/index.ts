import { prisma } from "@/config";
import { CreateUserType } from "@/services/users-service";

function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
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
};

export default usersRepository;
