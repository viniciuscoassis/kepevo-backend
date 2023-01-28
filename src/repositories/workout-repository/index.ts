import { prisma } from "@/config";

async function createInit() {
  return prisma.workout.createMany({
    data: [
      {
        title: "treinoA",
        userId: 2,
      },
      {
        title: "treinoB",
        userId: 2,
      },
      {
        title: "treinoC",
        userId: 2,
      },
      {
        title: "treinoD",
        userId: 2,
      },
      {
        title: "treinoE",
        userId: 2,
      },
    ],
  });
}

async function findAllByUser(userId: number) {
  return prisma.workout.findMany({
    where: { userId },
    include: {
      WorkoutExercise: {
        select: {
          MuscleGroups: true,
        },
      },
    },
  });
}

const workoutRepository = {
  findAllByUser,
  createInit,
};

export default workoutRepository;
