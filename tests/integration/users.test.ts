import app, { init } from "@/app";
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

describe("POST /users", () => {
  it("should respond with status 409 if email is not unique", async () => {
    const user = await createUser();
    const body = { email: "vini@gmail.com", password: "vini123" };
    const response = await server.post("/users").send(body);
    expect(response.status).toEqual(httpStatus.CONFLICT);
  });
  it("should respond with 201 and return created user", async () => {
    const body = { email: "vini@gmail.com", password: "vini123" };
    const response = await server.post("/users").send(body);
    expect(response.body).toEqual({
      id: expect.any(Number),
      email: body.email,
    });
    expect(response.status).toEqual(httpStatus.CREATED);
  });
});
