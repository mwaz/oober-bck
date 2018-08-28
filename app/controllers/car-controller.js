const Car = require("../models/car.model");
const BookedCar = require("../models/carBookings.model");
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
    capacity: req.body.capacity,
    createdBy: req.user._id,
    status: req.body.status
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

exports.getSingleCar = (req, res) => {
  Car.getCarById(req.params.id, (err, carData) => {
    if (err) {
      res.json({
        success: false,
        message: "Error fetching car" || err
      });
    }
    res.json({
      success: true,
      carData
    });
    console.log(carData);
  });
};

exports.getCarByName = (req, res) => {
  Car.getCarByName(car.carName, (err, car) => {
    if (car) {
      res.json({
        success: false,
        message: "A similar car exists",
        car
      });
    }
  });
};

// exports.bookCar = (req, res) => {
//   const bookedCar = new BookedCar({
//     bookedVehicle:
//     bookedBy:
//     vehicleStatus:

//   })
// }
