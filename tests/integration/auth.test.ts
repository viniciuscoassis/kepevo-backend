import app, { init } from "@/app";
import usersService from "@/services/users-service";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/user-factory";

import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /auth/login", () => {
  it("should respond with status 401 if there is no user", async () => {
    const newBody = {
      email: "vini@gmail.com",
      password: "vini123",
    };

    const response = await server.post("/auth/login").send(newBody);
    expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if password is incorrect", async () => {
    await usersService.postNewUser({
      email: "vini@gmail.com",
      password: "vini123",
    });
    const newBody = {
      email: "vini@gmail.com",
      password: "vini12",
    };

    const response = await server.post("/auth/login").send(newBody);
    expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 200 ", async () => {
    const newBody = {
      email: "vini@gmail.com",
      password: "vini123",
    };
    await usersService.postNewUser(newBody);

    const response = await server.post("/auth/login").send(newBody);
    expect(response.status).toEqual(httpStatus.OK);
  });
});
