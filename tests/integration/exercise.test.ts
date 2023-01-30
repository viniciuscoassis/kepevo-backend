import app, { init } from "@/app";
import { cleanDb } from "../helpers";
import supertest from "supertest";
import { createMuscle } from "../factories/exercise-factory";
import { createUser } from "../factories/user-factory";
import { createWorkout } from "../factories/workout-factory";
import httpStatus from "http-status";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /exercise", () => {
  it("should respond with status 400 if user does not exist", async () => {
    const user = 1;
    const workout = await createWorkout(user, "treinoA");
    const chest = await createMuscle("chest");
    const response = await server.post("/exercise").send({
      name: "crossover",
      workoutId: workout.id,
      muscleGroupId: chest.id,
    });
    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 201 and return the created exercise", async () => {
    const user = await createUser();
    const workout = await createWorkout(user.id, "treinoA");
    const chest = await createMuscle("chest");
    const response = await server.post("/exercise").send({
      name: "crossover",
      workoutId: workout.id,
      muscleGroupId: chest.id,
    });
    expect(response.body).toEqual({
      id: expect.any(Number),
      name: "crossover",
      muscleGroupId: chest.id,
      workoutId: workout.id,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(response.status).toEqual(httpStatus.CREATED);
  });
});
