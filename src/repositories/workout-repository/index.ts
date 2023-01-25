import { connectDb, prisma } from "@/config";

async function updateName() {
  return prisma.workout.findFirst();
}

async function findAllByUser(userId: number) {
  return prisma.workout.findMany();
}

const workoutRepository = {
  updateName,
  findAllByUser,
};

export default workoutRepository;
