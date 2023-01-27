import { prisma } from "@/config";

async function updateName() {
  return prisma.workout.findFirst();
}

async function createInit() {
  return prisma.workout.createMany({
    data: [
      {
        title: "treino A",
        userId: 2,
      },
      {
        title: "treino B",
        userId: 2,
      },
      {
        title: "treino C",
        userId: 2,
      },
      {
        title: "treino D",
        userId: 2,
      },
      {
        title: "treino E",
        userId: 2,
      },
    ],
  });
}

async function findAllByUser(userId: number) {
  return prisma.workout.findMany({ where: { userId } });
}

const workoutRepository = {
  updateName,
  findAllByUser,
  createInit,
};

export default workoutRepository;
