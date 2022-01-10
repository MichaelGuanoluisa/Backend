const request = require("supertest");
const app = require("../../src/index");
const faker = require("faker");
const mongoose = require("mongoose");

// testing

it("Post login respond a json with contain a user", (done) => {
  data = {
    email: "admin@hotmail.com",
    password: "12341234",
  };
  request(app)
    .post("/api/auth/login")
    .send(data)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(done);
});

it("Get News respond a json with contain news", (done) => {
  request(app)
    .get("/api/news")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200, done);
});

it("Get a user by id respond 404 not found", (done) => {
  id = mongoose.Schema.Types.ObjectId;
  request(app)
    .get(`/api/news/${id}`)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(404, done);
});

it("Post news with a json", (done) => {
  data = {
    title: faker.datatype.string(),
    description: faker.datatype.string(),
    imgURL: "ifgf.png",
  };
  request(app)
    .post("/api/news")
    .send(data)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(403)
    .expect('{"message":"Inicie sesión"}')
    .end(done);
});

it("Post news with a json", (done) => {
  data = {
    title: faker.datatype.string(),
    description: faker.datatype.string(),
    imgURL: "ifgf.png",
  };
  request(app)
    .post("/api/news")
    .send(data)
    .set("Accept", "application/json")
    .set(
      "x-access-token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYWU0ZDIwMGU3YzYwMDgzMzM4YzhhMiIsImlhdCI6MTY0MTUwOTY5NiwiZXhwIjoxNjQxNTk2MDk2fQ.EDOQjH3H4Z8TjCJmaY5siOyJSN3imQsIlLqaih4kVKc"
    )
    .expect("Content-Type", /json/)
    .expect(201)
    .end(done);
});
