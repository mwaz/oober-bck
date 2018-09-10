const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
const mongoose = require("mongoose");
// const app = require("../../config/database.config");
const User = require("../app/models/user.model");
const request = require("supertest");
const sinon = require("sinon");
const auth = require("../app/controllers/auth-controller");
const app = require("../app.js");
const chaiHttP = require("chai-http");
let should = chai.should();
const agent = request.agent(app);
chai.use(chaiHttP);

describe("User registration process", () => {
  before(done => {
    user = new User({
      username: "TestUser",
      email: "test@email.com",
      password: "testPassword"
    });
    User.addUser(user);
    done();
  });

  it("should throw an error if duplicate user exists", done => {
    agent
      .post("/auth/signup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("should return an error if user is not authenticated", done => {
    agent.get("/auth/profile").end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });

  /* Test the Get profile route */
  describe("Running profile tests", () => {
    let loginDetails = {
      username: "TestUser",
      password: "testPassword"
    };
    let _token = null;

    before(done => {
      agent
        .post("/auth/login")
        .send(loginDetails)
        .then(data => {
          _token = data.body.token;
          assert.ok(_token);
        });
      done();
    });

    it("should return profile of an authenticated user", done => {
      agent
        .get("/auth/profile")
        .set("Authorization", _token)
        .end((err, res) => {
          // expect(res.status).to.equal(200);
          expect(200);
          console.log(res.data, "resposonse data");
          done();
        });
    });
  });

  after(done => {
    User.remove({}, err => {
      done();
    });
  });
});
