import app, { init } from "@/app";
import { prisma } from "@/config";
import usersService from "@/services/users-service";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/users-factory";
import { findSessionByUserId } from "../factories/session-factory";

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

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    it("should respond with status 404 there is no user for the email", async () => {
      const body = generateValidBody();
      const response = await server.post("/auth/login").send(body);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 200 if login is made", async () => {
      const body = generateValidBody();
      const user = await createUser(body);

      const res = await server.post("/auth/login").send(body);

      expect(res.status).toBe(httpStatus.OK);
      expect(res.body).toEqual({
        user: {
          email: user.email,
          id: expect.any(Number),
        },
        token: expect.any(String),
      });
    });
  });
});
