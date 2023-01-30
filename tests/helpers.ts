import { prisma } from "@/config";

export async function cleanDb() {
  await prisma.workoutExercise.deleteMany({});
  await prisma.muscleGroups.deleteMany({});
  await prisma.workout.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
}
