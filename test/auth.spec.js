process.env.NODE_ENV = "TESTING";

const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
const mongoose = require("mongoose");
const User = require("../app/models/user.model");
const supertest = require("supertest");
const app = require("../app.js");
const mongoUnit = require("mongo-unit");
const mongodb = require("mongodb");
const chaiHttP = require("chai-http");
const testData = require("../fixtures/testData");
let should = chai.should();
chai.use(chaiHttP);
const authController = require("../app/controllers/auth-controller");

describe("Authentication and Setup Tests", function() {
  let request = null;
  let server = null;

  before(function(done) {
    user = new User(testData.sampleUserA);
    User.addUser(user);
    server = app.listen(done);
    request = supertest.agent(server);
  });

  // after(function(done) {
  //   // server.close(done);
  // });

  it("should create a new user POST /auth/signup", function(done) {
    request
      .post("/auth/signup")
      .send(testData.sampleUserH)
      .expect(200)
      .then(res => {
        res.body.should.be.a("Object");
        res.body.should.have.property("message");
        res.body.should.have.property("success");
        res.body.should.have.property("user");
        res.body.message.should.be.eql("User Registered Successfully");
      });
    done();
  });

  it("should throw an error if attempts to recreate a user are made POST /auth/signup", function(done) {
    request
      .post("/auth/signup")
      .send(testData.sampleUserI)
      .expect(200)
      .then(
        request
          .post("/auth/signup")
          .send(testData.sampleUserI)
          .then(res => {
            res.body.should.be.a("Object");
            res.body.should.have.property("message");
            res.body.should.have.property("success");
            res.body.success.should.be.eql(false);
          })
      );
    done();
  });

  it("Should return 400 if user has no username POST /auth/signup", function(done) {
    request
      .post("/auth/signup")
      .send(testData.sampleUserD)
      .expect(400)
      .end((err, data) => {
        data.should.have.status(400);
        data.body.should.be.a("Object");
        data.body.message.should.be.eql("User details cannot be empty");
        done();
      });
  });
  it("Should return 400 if user has no email POST /auth/signup", function(done) {
    request
      .post("/auth/signup")
      .send(testData.sampleUserE)
      .expect(400)
      .end((err, data) => {
        data.should.have.status(400);
        data.body.should.be.a("Object");
        data.body.message.should.be.eql("User details cannot be empty");
        done();
      });
  });
  it("Should return 400 if user has no password POST /auth/signup", function(done) {
    request
      .post("/auth/signup")
      .send(testData.sampleUserF)
      .expect(400)
      .end((err, data) => {
        data.should.have.status(400);
        data.body.should.be.a("Object");
        data.body.message.should.be.eql("User details cannot be empty");
        done();
      });
  });

  it("Should return 400 if passwords do not match POST /auth/signup", function(done) {
    request
      .post("/auth/signup")
      .send(testData.sampleUserG)
      .expect(400)
      .end((err, data) => {
        data.should.have.status(400);
        data.body.should.be.a("Object");
        data.body.message.should.be.eql("Passwords do not match");
        done();
      });
  });

  it("should return an error if user is not authenticated POST /auth/profile", function(done) {
    request
      .get("/auth/profile")
      .expect(401)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it("should login a user POST /auth/login", function(done) {
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

  it("should throw error if login details are incorrect POST /auth/login", function(done) {
    request
      .post("/auth/login")
      .send(testData.sampleUserAA)
      .expect(400)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("Object");
        res.body.message.should.be.eql("Wrong Password");
        done();
      });
  });

  it("should throw error user does not exist POST /auth/login", function(done) {
    request
      .post("/auth/login")
      .send(testData.sampleUserG)
      .expect(400)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("Object");
        res.body.should.have.property("success");
        res.body.success.should.be.eql(false);
        done();
      });
  });

  it("should show profile of user after login POST /auth/login", function(done) {
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
  it("should throw error if login details are not correct POST /auth/login", function(done) {
    request
      .post("/auth/login")
      .send(testData.sampleInvalidLogindetails)

      .then(data => {
        data.should.be.a("Object");
        data.body.should.have.property("success");
        data.body.should.have.property("message");
        data.body.success.should.be.eql(false);
        data.body.message.should.be.eql("User not found");
        done();
      });
  });
  it("should throw error if login details are not provided POST /auth/login", function(done) {
    request
      .post("/auth/login")
      .send({ username: "", password: "sompassword" })
      .expect(400)
      .then(data => {
        data.body.should.be.a("Object");
        data.body.should.have.property("message");
        data.body.message.should.be.eql("Kindly fill in all login details");
      });
    done();
  });
});
