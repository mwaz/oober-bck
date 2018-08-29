const moongoose = require("mongoose");

const CarSchema = moongoose.Schema(
  {
    carName: {
      type: String,
      min: [3, "Car name too short"],
      max: 50,
      required: [true, "Kindly provide a car name"],
      unique: true
    },
    type: {
      type: String,
      min: [3, "Car type name too short"],
      max: 50,
      required: [true, "Kindly provide a valid car type"]
    },
    model: {
      type: String,
      min: [3, "Car type name too short"],
      max: 50,
      required: [false, "Kindly provide a valid car model"]
    },
    capacity: {
      type: String,
      max: 50,
      required: [true, "Kindly provide valid car capacity details"]
    },
    createdBy: {
      type: String
    },
    status: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Car = (module.exports = moongoose.model("Car", CarSchema));

module.exports.addCar = function(newCar, callback) {
  newCar.save(callback);
};

module.exports.getCarList = function(callback) {
  Car.find(callback);
};

module.exports.getCarById = function(carId, callback) {
  Car.findById(carId, callback);
};

module.exports.getCarByName = function(carName, callback) {
  const query = { carName: carName };
  Car.find(query, callback).limit(1);
};

module.exports.deleteCarById = function(carID, callback) {
  const query = { _id: carID };
  Car.remove(query, callback);
};
