process.env.NODE_ENV = "TESTING";

const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
const mongoose = require("mongoose");
// const app = require("../../config/database.config");
const User = require("../app/models/user.model");
const supertest = require("supertest");
const app = require("../app.js");
const mongoUnit = require("mongo-unit");
const mongodb = require("mongodb");
const chaiHttP = require("chai-http");
const testData = require("../fixtures/testData");
let should = chai.should();
// const agent = request.agent(app);
chai.use(chaiHttP);
const mongoClient = require("mongodb").MongoClient;

describe("Authentication and Setup Tests", function() {
  let request = null;
  let server = null;

  before(function(done) {
    user = new User(testData.sampleUserA);
    User.addUser(user);
    server = app.listen(done);
    request = supertest.agent(server);
  });

  after(function(done) {
    // server.close(done);
  });

  it("should create a new user", function() {
    return request
      .post("/auth/signup")
      .send(testData.sampleUserA)
      .expect(200);
  });

  it("Should return 400 if user has no username", function() {
    request
      .post("/auth/signup")
      .send(testData.sampleUserD)
      .end((err, data) => {
        console.log(data.body.message);
        data.body.should.be.a("Object");
        data.body.message.should.be.eql("User details cannot be empty");
      });
  });
  it("Should return 400 if user has no email", function() {
    request
      .post("/auth/signup")
      .send(testData.sampleUserE)
      .end((err, data) => {
        console.log(data.body.message);
        data.body.should.be.a("Object");
        data.body.message.should.be.eql("User details cannot be empty");
      });
  });
  it("Should return 400 if user has no password", function() {
    request
      .post("/auth/signup")
      .send(testData.sampleUserF)
      .end((err, data) => {
        console.log(data.body.message);
        data.body.should.be.a("Object");
        data.body.message.should.be.eql("User details cannot be empty");
      });
  });

  it("Should return 400 if passwords do not match", function() {
    request
      .post("/auth/signup")
      .send(testData.sampleUserG)
      .end((err, data) => {
        console.log(data.body.message);
        data.body.should.be.a("Object");
        data.body.message.should.be.eql("Passwords do not match");
      });
  });

  it("should return an error if user is not authenticated", function(done) {
    request.get("/auth/profile").end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });

  it("should login a user", function(done) {
    let _token = null;
    request
      .post("/auth/login")
      .send(testData.sampleUserA)
      .expect(200)
      .then(data => {
        _token = data.body.token;
        assert.ok(_token);
      });
    done();
  });

  it("should throw error if login details are incorrect", function() {
    request
      .post("/auth/login")
      .send(testData.sampleUserAA)
      .expect(400)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("Object");
        res.body.message.should.be.eql("Wrong Password");
      });
  });

  it("should throw error user does not exist", function() {
    request
      .post("/auth/login")
      .send(testData.sampleUserG)
      .expect(400)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("Object");
        res.body.should.have.property("success");
        res.body.success.should.be.eql(false);
      });
  });

  it("should show profile of user after login", function(done) {
    let _token = null;
    request
      .post("/auth/login")
      .send(testData.sampleUserA)
      .expect(200)
      .then(data => {
        _token = data.body.token;
        request
          .get("/auth/profile")
          .set("Authorization", _token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("Object");
            res.body.should.have.property("user");
            res.body.user.should.have.property("username");
            res.body.user.should.have.property("password");
            res.body.user.should.have.property("email");
            done();
          });
      });
  });
});
