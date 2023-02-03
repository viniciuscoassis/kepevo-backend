import { prisma } from "@/config";

async function createInit(userId: number) {
  return prisma.workout.createMany({
    data: [
      {
        title: "treinoA",
        userId,
      },
      {
        title: "treinoB",
        userId,
      },
      {
        title: "treinoC",
        userId,
      },
      {
        title: "treinoD",
        userId,
      },
      {
        title: "treinoE",
        userId,
      },
    ],
  });
}

async function findAllByUser(userId: number) {
  return await prisma.workout.findMany({
    where: { userId },
    include: {
      WorkoutExercise: {
        include: {
          MuscleGroups: true,
        },
      },
    },
  });
}

async function findAllMuscles() {
  return await prisma.muscleGroups.findMany({});
}

const workoutRepository = {
  findAllByUser,
  createInit,
  findAllMuscles,
};

export default workoutRepository;
