const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
const mongoose = require("mongoose");
const app = require("../../config/database.config");
const User = require("../models/user.model");
const request = require("supertest");
const sinon = require("sinon");
const auth = require("../controllers/auth-controller");
const server = require("../../app.js");
const chaiHttP = require("chai-http");
chai.use(chaiHttP);

let user = {
  username: "Username",
  email: "some@email.com",
  password: "somepassword",
  confirmPassword: "somepassword"
};
describe("smoke test", function() {
  it("shows smoke signal", function() {
    expect(true).to.be.true;
  });
});

describe("cretes a user", function() {
  it("creates a user", function(done) {
    let req = {
      user
    };
    next = {};
    let res = {
      send: function() {}
    };

    chai
      .request(server)
      .post("/auth/signup")
      .send({ user })
      .end((err, res) => {
        if (err) return done(err);
        done(res);
        User.find({ user }).then(users => {
          expect(users.length).to.be.be(1);
        });
      });
    // console.log(res.send);
  });
});
