const mongoose = require("mongoose");

const carBookingSchema = mongoose.Schema(
  {
    bookedVehicle: {
      type: String,
      required: true
    },
    bookedBy: {
      type: String,
      required: true
    },
    vehicleStatus: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const carBooking = (module.exports = mongoose.model(
  "CarBooking",
  carBookingSchema
));
