import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.muscleGroups.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.workout.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.workoutExercise.deleteMany({});

  const muscleGroups = await prisma.muscleGroups.createMany({
    data: [
      { name: "chest" },
      { name: "back" },
      { name: "biceps" },
      { name: "triceps" },
      { name: "abdominals" },
      { name: "legs" },
      { name: "shoulders" },
    ],
  });
  console.log(muscleGroups);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
