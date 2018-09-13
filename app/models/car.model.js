const moongoose = require("mongoose");

const CarSchema = moongoose.Schema(
  {
    carName: {
      type: String,
      min: [3, "Car name too short"],
      max: 50,
      required: [true, "Kindly provide a car name"]
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

module.exports.getCarList = function(userId, callback) {
  const query = { createdBy: userId };
  Car.find(query, callback);
};

module.exports.getCarById = function(carId, callback) {
  const query = { _id: carId };

  Car.find(query, callback);
};

// module.exports.getCarByName = function(carName, callback) {
//   const query = { carName: carName };
//   Car.find(query, callback).limit(1);
// };

module.exports.deleteCarById = function(carId, userId, callback) {
  const query = { _id: carId, createdBy: userId };
  Car.findOneAndDelete(query, callback);
};

module.exports.editCarById = function(carId, carDetails, callback) {
  Car.findById(carId, (err, car) => {
    if (err) throw err;
    Object.assign(car, carDetails).save(callback);
  });
};
