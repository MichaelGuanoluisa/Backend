const request = require("supertest");
const app = require("../../src/index");
const faker = require("faker");
const mongoose = require("mongoose");

// testing
const token = "";

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

it("Post register respond a json with message user registered", (done) => {
  data = {
    name: "michael",
    lastname: "guanoluisa",
    email: `${faker.name.firstName()}+ @hotmail.com`,
    cellphone: "0961393801",
    password: "12341234",
  };
  request(app)
    .post("/api/auth/register")
    .send(data)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .expect('{"message":"Usuario registrado con exito"}')
    .end(done);
});

it("Get News respond a json with contain news", (done) => {
  request(app)
    .get("/api/news")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200, done);
});

it("Get a news by id respond 404 not found", (done) => {
  id = "61c10af1c76fd906ecba0634";
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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYWU0ZDIwMGU3YzYwMDgzMzM4YzhhMiIsImlhdCI6MTY0MjY5OTUwOSwiZXhwIjoxNjQyNzg1OTA5fQ.CXUHbMfBECFYroIYa01dPcNYbGKcjU9h2x75FvxeK8A"
    )
    .expect("Content-Type", /json/)
    .expect(201)
    .end(done);
});
