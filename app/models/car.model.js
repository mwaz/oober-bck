const moongoose = require("mongoose");
const bycrypt = require("bcryptjs");

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
