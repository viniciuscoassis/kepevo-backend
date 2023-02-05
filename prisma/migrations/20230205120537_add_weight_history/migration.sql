-- CreateTable
CREATE TABLE "WeightsHistory" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeightsHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeightsHistory" ADD CONSTRAINT "WeightsHistory_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
