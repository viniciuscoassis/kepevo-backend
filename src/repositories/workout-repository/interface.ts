export interface WorkoutWithExerciseAndMuscleGroup {
  id: number;
  title: string;
  updatedAt: Date;
  createdAt: Date;
  userId: number;
  WorkoutExercise: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    workoutId: number;
    name: string;
    muscleGroupId: number;
    MuscleGroups: {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      name: string;
    };
  }[];
}

// MuscleGroups[id: number createdAt: Date updatedAt: Date name: string]
