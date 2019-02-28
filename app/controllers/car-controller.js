const Car = require("../models/car.model");
const validate = require("../../utils/carValidators");

exports.create = async (req, res, next) => {
  try {
    await validate.validateCarData(req);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err
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
      return res.status(409).json({
        success: false,
        message: `Failed to add Car, ${err.message}`
      });
    }
    res.status(201).json({
      success: true,
      message: "Successfully Added Car",
      car
    });
  });
};

exports.getCars = (req, res, next) => {
  Car.getCarList(req.user.id, (err, car) => {
    if (err) {
      return res.json({
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
      return res.status(400).json({
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
      return res.status(400).json({
        success: false,
        message: "Error deleting car" || err
      });
    }
    res.status(200).json({
      success: true,
      message: "Car Successfully deleted",
      carData
    });
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
      return res.status(400).json({
        success: false,
        message: "Failed to edit Car"
      });
    }
    x;
    res.status(200).json({
      success: true,
      message: "Successfully Edited Car",
      car
    });
  });
};
