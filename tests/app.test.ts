import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Guest Routes", () => {
  it("should return 200 OK for the home page", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });

  it("should return 404 for a fake page", async () => {
    const response = await request(app).get("/this-page-does-not-exist");
    expect(response.status).toBe(404);
  });
});
