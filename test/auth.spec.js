const knex = require("./../database/dbConfig");
const server = require("./../api/server");
const request = require("supertest");

const defaultCredentials = {
  username: "lambda",
  password: "sprint1258@",
};

beforeEach((done) => {
  knex.migrate.rollback().then(() => {
    knex.migrate.latest().then(() => {
      done();
    });
  });
});

describe("testing authentication", () => {
  it("POST /api/auth/register", async () => {
    const response = await request(server)
      .post("/api/auth/register")
      .send(defaultCredentials);

    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    expect(response.body.username).toEqual(defaultCredentials.username);
  });

  it("POST /api/auth/register should return 401 when validation failed", async () => {
    const response = await request(server).post("/api/auth/register").send({});

    expect(response.status).toBe(401);
  });
  it("POST /api/auth/register should return 401 when username exist", async () => {
    await request(server).post("/api/auth/register").send(defaultCredentials);

    const response = await request(server)
      .post("/api/auth/register")
      .send(defaultCredentials);

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/already in use/);
  });

  it("POST /api/auth/login", async () => {
    await request(server).post("/api/auth/register").send(defaultCredentials);

    const response = await request(server)
      .post("/api/auth/login")
      .send(defaultCredentials);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it("POST /api/auth/login should return 403 when invalid credentials", async () => {
    const response = await request(server)
      .post("/api/auth/login")
      .send(defaultCredentials);

    expect(response.status).toBe(403);
    expect(response.body.message).toMatch(/Invalid credentials/);
  });

  it("GET /api/auth/logout", async () => {
    // register new user
    await request(server)
      .post("/api/auth/register")
      .send(defaultCredentials)
      .expect(201);
    // Login to get access token
    const accessToken = (
      await request(server).post("/api/auth/login").send(defaultCredentials)
    ).body.token;
    // Logout
    await request(server)
      .get("/api/auth/logout")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
    // Test if access token is revoked
    await request(server)
      .get("/api/jokes")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(403);
  });
});

describe("testing jokes", () => {
  it("GET /api/jokes", async () => {
    await request(server).post("/api/auth/register").send(defaultCredentials);
    const accessToken = (
      await request(server).post("/api/auth/login").send(defaultCredentials)
    ).body.token;

    const response = await request(server)
      .get("/api/jokes")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(20);
  });

  it("GET /api/jokes should return 401 if not authenticated", async () => {
    const response = await request(server).get("/api/jokes");

    expect(response.status).toBe(403);
  });
});
