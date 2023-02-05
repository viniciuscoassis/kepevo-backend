import { ApplicationError } from "@/protocols";

export function cantCreateExercise(): ApplicationError {
  return {
    name: "cantCreateExercise",
    message: "No result for this search!",
  };
}
