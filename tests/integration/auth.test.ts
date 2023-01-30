import app, { init } from "@/app";
import { prisma } from "@/config";
import usersService from "@/services/users-service";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/users-factory";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /auth/login", () => {
  it("should respond with status 401 when body is not given", async () => {
    const response = await server.post("/auth/login");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 401 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/auth/login").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 401 if there is no user with this email", async () => {
    const newBody = {
      email: "vini@gmail.com",
      password: "vini123",
    };

    const response = await server.post("/auth/login").send(newBody);
    expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 200 returning user and token", async () => {
    const password = "vini123";
    const user = await createUser({ password });
    const response = await server
      .post("/auth/login")
      .send({ email: user.email, password });
    expect(response.body).toEqual({
      user: {
        id: expect.any(Number),
        email: user.email,
      },
      token: expect.any(String),
    });

    expect(response.status).toEqual(httpStatus.OK);
  });
  it("should not return user password on body", async () => {
    await createUser();
    const body = { email: "vini@gmail.com", password: "vini123" };

    const response = await server.post("/auth/login").send(body);

    expect(response.body).not.toHaveProperty("password");
    console.log(response.body);
  });
});
