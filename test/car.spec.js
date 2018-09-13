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

  // Login user
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

  // Create Car A
  before(function(done) {
    request
      .post("/oober/api/cars")
      .set("Authorization", _token)
      .send(testData.carSampleA)
      .expect(200)
      .then(res => {
        _carId = res.body.car._id;
        done();
      });
  });

  // Create another car
  before(function(done) {
    request
      .post("/oober/api/cars")
      .set("Authorization", _token)
      .send(testData.carSampleC)
      .expect(200)
      .then(res => {
        _carId2 = res.body.car._id;
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
        res.body.should.have.property("message");
        res.body.should.have.property("success");
        res.body.should.have.property("car");
        res.body.should.be.a("Object");
        res.body.car.should.be.a("Object");
        res.body.car.should.have.property("carName");
        res.body.car.carName.should.be.eql("someCarB");
      });
    done();
  });

  it("Should throw errors if missing car details", function(done) {
    request
      .post("/oober/api/cars")
      .set("Authorization", _token)
      .send(testData.carSampleBB)
      .expect(400)
      .then(res => {
        res.body.should.have.property("message");
        res.body.should.have.property("success");
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql("Kindly fill in all details");
      });
    done();
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
      });
    done();
  });
  it("Should throw error if wrong car id is provided on fetch", function(done) {
    request
      .get("/oober/api/cars/1")
      .set("Authorization", _token)
      .then(res => {
        res.body.should.be.a("Object");
        res.body.should.have.property("success");
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message");
        res.body.message.should.be.eql("Error fetching car");
        done();
      });
  });

  it("Should get a single car", function(done) {
    request
      .get(`/oober/api/cars/${_carId}`)
      .set("Authorization", _token)
      .expect(200)
      .then(res => {
        res.body.should.be.a("Object");
        res.body.should.have.property("success");
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("carData");
      });
    done();
  });

  it("Should delete a single car", function(done) {
    request
      .delete(`/oober/api/cars/${_carId2}`)
      .set("Authorization", _token)
      .expect(200)
      .then(res => {
        res.body.should.have.property("success");
        res.body.should.have.property("message");
        res.body.should.have.property("carData");
        res.body.message.should.be.eql("Car Successfully deleted");
      });
    done();
  });

  it("Should successfully edit a car", function(done) {
    request
      .put(`/oober/api/cars/${_carId}`)
      .set("Authorization", _token)
      .send(testData.carEditSampleA)
      .then(res => {
        res.body.should.have.property("success");
        res.body.should.have.property("message");
        res.body.message.should.be.eql("Successfully Edited Car");
      });
    done();
  });

  it("Throws error for invalid delete id on a car ", function(done) {
    const fakeID = "5b978f2aa0b58424556866bcg";
    request
      .delete(`/oober/api/cars/${fakeID}`)
      .set("Authorization", _token)
      .then(res => {
        res.body.should.have.property("message");
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql("Error deleting car");
        done();
      });
  });
});
