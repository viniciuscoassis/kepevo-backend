import { ApplicationError } from "@/protocols";

export function invalidBodyError(): ApplicationError {
  return {
    name: "invalidUserSent",
    message: "email or password are incorrect",
  };
}
