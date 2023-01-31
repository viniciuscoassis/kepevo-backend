import app, { init } from "@/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/users-factory";

import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /users", () => {
  it("should respond with status 400 invalid or inexistent body", async () => {
    const invalidBody = {
      idade: 20,
      name: faker.name,
    };

    const response = await server.post("/users").send(invalidBody);
    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });
  describe("when body is valid", () => {
    const validBodyGenetation = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    it("should respond with status 409 if email given already exists", async () => {
      const body = validBodyGenetation();
      await createUser(body);

      const response = await server.post("/users").send(body);
      expect(response.status).toEqual(httpStatus.CONFLICT);
    });

    it("should respond with status 201 if user is created", async () => {
      const createUserBody = validBodyGenetation();

      const response = await server.post("/users").send(createUserBody);
      expect(response.status).toEqual(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        email: createUserBody.email,
      });
    });
  });
});
