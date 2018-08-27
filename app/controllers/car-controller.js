const Car = require("../models/car.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../config/database.config");

exports.create = (req, res, next) => {
  if (!req.body.carName || !req.body.model) {
    return res.status(400).json({
      success: false,
      message: "Kindly fill in all details"
    });
  }
  const car = new Car({
    carName: req.body.carName,
    type: req.body.type,
    model: req.body.model,
    capacity: req.body.capacity
  });

  Car.addCar(car, (err, car) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to add Car"
      });
    }
    res.json({
      success: true,
      message: "Successfully Added Car",
      car
    });
  });
};

exports.getCars = (req, res, next) => {
 
  Car.getCarList((err, car) => {
    if (err) {
      res.json({
        success: false,
        message: "Error fetching cars"
      });
    }
    res.json({
      success: true,
      cars: car
    });
  });
};
