import { ApplicationError } from "@/protocols";

export function exerciseNotFoundError(): ApplicationError {
  return {
    name: "ExerciseNotFoundError",
    message: "There is no exercise for this exercise id!",
  };
}
