import app, { init } from "@/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import {
  createExercise,
  createMuscle,
  postWeight,
} from "../factories/exercise-factory";
import { createUser, createAndInit } from "../factories/users-factory";
import { createWorkout } from "../factories/workout-factory";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET exercise/weight/id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/exercise/weight/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .get("/exercise/weight/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign(
      { userId: userWithoutSession.id },
      process.env.JWT_SECRET
    );

    const response = await server
      .get("/exercise/weight/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    const validMuscleName = "chest";
    const validExerciseName = "crossover";
    it("should respond with status 404 and if exerciseId does not exists", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server
        .get("/exercise/weight/1")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should respond with status 200 and {} if no weight were found", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const muscle = await createMuscle(validMuscleName);
      const workout = await createWorkout(user.id, validExerciseName);
      const exercise = await createExercise(workout.id, muscle.id);

      const response = await server
        .get(`/exercise/weight/${exercise.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toHaveLength(0);
    });
    it("should respond with status 200 and return all the history", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const muscle = await createMuscle(validMuscleName);
      const workout = await createWorkout(user.id, validExerciseName);
      const exercise = await createExercise(workout.id, muscle.id);
      await postWeight(exercise.id, 20);

      const response = await server
        .get(`/exercise/weight/${exercise.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toHaveLength(1);
    });
  });
});

describe("POST exercise/weight", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/exercise/weight");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .post("/exercise/weight")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign(
      { userId: userWithoutSession.id },
      process.env.JWT_SECRET
    );

    const response = await server
      .post("/exercise/weight")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    const validMuscleName = "chest";
    const validExerciseName = "crossover";
    it("should respond with status 400 if body is not valid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const unvalidBody = { name: "vinicius", age: 20 };
      const response = await server
        .post("/exercise/weight")
        .send(unvalidBody)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it("should respond with status 404 if exercise is not found", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = { exerciseId: 1, value: 20 };
      const response = await server
        .post("/exercise/weight")
        .send(body)
        .set("Authorization", `Bearer ${token}`);
      console.log(response.body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should respond with status 201 and return created weight history", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const muscle = await createMuscle(validMuscleName);
      const workout = await createWorkout(user.id, validExerciseName);
      const exercise = await createExercise(workout.id, muscle.id);
      const body = { exerciseId: exercise.id, value: 20 };
      const response = await server
        .post("/exercise/weight")
        .send(body)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});
