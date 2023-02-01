import app, { init } from "@/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createUser, createAndInit } from "../factories/users-factory";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /workout", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/workout");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .get("/workout")
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
      .get("/workout")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    const generateValidUserBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    it("should respond with status 404 if A-E workouts werent created", async () => {
      const token = await generateValidToken();

      const response = await server
        .get("/workout")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should respond with status 200 and return A-E workouts", async () => {
      const userBody = generateValidUserBody();
      const user = await createAndInit(userBody);
      const token = await generateValidToken(user);

      const response = await server
        .get("/workout")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toHaveLength(5);
    });
  });
});
