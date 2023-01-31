import { ApplicationError } from "@/protocols";

export function createInitError(): ApplicationError {
  return {
    name: "createInitError",
    message: "it was not possible to create base workouts",
  };
}
