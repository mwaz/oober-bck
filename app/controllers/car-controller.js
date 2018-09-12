const Car = require("../models/car.model");
const BookedCar = require("../models/carBookings.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");

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
  Car.getCarList(req.user.id, (err, car) => {
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

exports.getCar = (req, res) => {
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
  });
};

exports.deleteCar = (req, res) => {
  Car.deleteCarById(req.params.id, req.user.id, (err, carData) => {
    if (err) {
      res.json({
        success: false,
        message: "Error deleting car" || err
      });
    }
    res.json({
      success: true,
      message: "Car Successfully deleted",
      carData
    });
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

exports.editCar = (req, res, next) => {
  const car = {
    carName: req.body.carName,
    type: req.body.type,
    model: req.body.model,
    capacity: req.body.capacity,
    createdBy: req.user._id,
    status: req.body.status
  };

  Car.editCarById(req.params.id, car, (err, car) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to edit Car"
      });
    }
    res.json({
      success: true,
      message: "Successfully Edited Car",
      car
    });
  });
};

// exports.bookCar = (req, res) => {
//   const bookedCar = new BookedCar({
//     bookedVehicle:
//     bookedBy:
//     vehicleStatus:

//   })
// }
