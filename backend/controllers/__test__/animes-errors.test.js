const supertest = require("supertest");
const app = require("../../app");
const { createOneAnime } = require("../../queries/animes");
jest.mock("../../queries/animes.js", () => {
  const actualModule = jest.requireActual("../../queries/animes.js");
  for (const func in actualModule) {
    actualModule[func] = jest.fn(() => {
      throw new Error("Mock server error");
    });
  }
  return { ...actualModule };
});
describe("/animes errors", () => {
  it("GET /animes should throw a 500 if the database is down", async () => {
    const response = await supertest(app).get("/animes");
    expect(response.statusCode).toBe(500);
  });
  it("POST /animes should throw a 500 if the database is down", async () => {
    const res = await supertest(app).post("/animes").send({
      name: "Fake anime",
      description: "This anime does not exist.",
    });
    expect(res.statusCode).toBe(500);
  });
  it("PUT /animes/:animeId should throw a 500 if the database is down", async () => {
    const res = await supertest(app).put(`/animes/${1}`).send({
      name: "fakeanime3",
      description: "new description",
    });
    expect(res.statusCode).toBe(500);
  });
  it("DELETE /animes/:animeId should throw a 500 if the database is down", async () => {
    const response = await supertest(app).delete("/animes/1");
    expect(response.statusCode).toBe(500);
  });
});
jest.restoreMocks()
describe('user errors for /animes', () => {
  it('POST /animes should throw a 400 error if there is not both a name and a description in the request body', async () => {
    
  })
})
