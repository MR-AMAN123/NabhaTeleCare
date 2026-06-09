const mongoose = require("mongoose");

const reservationSchema =
  new mongoose.Schema(
    {
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      pharmacy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      message: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "CONFIRMED",
          "CANCELLED",
          "COLLECTED",
        ],
        default: "PENDING",
      },
    },
    { timestamps: true }
  );

module.exports = mongoose.model(
  "MedicineReservation",
  reservationSchema
);