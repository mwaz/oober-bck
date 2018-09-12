process.env.NODE_ENV = "TESTING";

const assert = require("assert"),
  User = require("../app/models/user.model"),
  Car = require("../app/models/car.model"),
  supertest = require("supertest"),
  app = require("../app.js"),
  testData = require("../fixtures/testData"),
  chai = require("chai"),
  should = chai.should();

describe("Car endpoints", function() {
  let request = null;
  let server = null;

  before(function(done) {
    server = app.listen(done);
    request = supertest.agent(server);
  });

  before(function(done) {
    request
      .post("/auth/login")
      .send(testData.sampleUserA)
      .expect(200)
      .then(data => {
        _token = data.body.token;
        done();
      });
  });

  after(async function(done) {
    await User.deleteMany({});
    await Car.deleteMany({});
    await process.exit(0);
    done();
  });

  it("Should add a car", function(done) {
    request
      .post("/oober/api/cars")
      .set("Authorization", _token)
      .send(testData.carSampleB)
      .expect(200)
      .then(res => {
        res.body.car.should.be.a("Object");
        res.body.should.be.a("Object");
        res.body.should.have.property("success");
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("car");

        done();
      });
  });

  it("Should get added cars", function(done) {
    request
      .get("/oober/api/cars")
      .set("Authorization", _token)
      .expect(200)
      .then(res => {
        res.body.cars.should.be.a("Array");
        res.body.should.be.a("Object");
        res.body.should.have.property("success");
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("cars");

        done();
      });
  });
});
