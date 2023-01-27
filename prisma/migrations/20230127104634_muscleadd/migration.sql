/*
  Warnings:

  - You are about to drop the column `exercise` on the `WorkoutExercise` table. All the data in the column will be lost.
  - Added the required column `muscleGroupId` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutExercise" DROP COLUMN "exercise",
ADD COLUMN     "muscleGroupId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MuscleGroups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MuscleGroups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "MuscleGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
