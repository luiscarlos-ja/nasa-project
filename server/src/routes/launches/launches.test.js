const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    it("GET /launches returns 200 status code", async () => {
      const response = await request(app).get("/launches");
      expect(response.statusCode).toBe(200);
    });

    it("GET /launches returns an array", async () => {
      const response = await request(app)
        .get("/launches")
        .expect("Content-Type", /json/);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("Test POST /launch", () => {
    const launchData = {
      mission: "USS Enterprise",
      rocket: "NCC-1701-D",
      launchDate: "January 1, 2030",
      target: "Kepler-62 f",
    };

    const launchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "NCC-1701-D",
      target: "Kepler-62 f",
    };

    const launchDataWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "NCC-1701-D",
      launchDate: "Must to fail",
      target: "Kepler-62 f",
    };

    it("POST /launches returns 201 status code", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const responseDate = new Date(response.body.launchDate).valueOf();
      const requestData = new Date(launchData.launchDate).valueOf();

      expect(responseDate).toBe(requestData);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    it("POST /launches Missing required launch property returns 400 status code", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    it("POST /launches Invalid launch date return 400 status code", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);
      expect(response.body).toStrictEqual({ error: "Invalid launch date" });
    });
  });

  describe("Test DELETE /launch/:id", () => {
    it("DELETE /launches/:id returns 200 status code", async () => {
      await request(app)
        .delete("/launches/100")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("DELETE /launches/:id returns 404 status code", async () => {
      const response = await request(app)
        .delete("/launches/102")
        .expect("Content-Type", /json/)
        .expect(404);
      expect(response.body).toStrictEqual({ error: "Launch not found" });
    });
  });
});
