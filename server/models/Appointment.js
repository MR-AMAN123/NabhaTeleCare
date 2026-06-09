const mongoose= require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "APPROVED",
        "REJECTED",
        "COMPLETED",
      ],
      default: "PENDING",
    },

    meetingRoom: {
      type: String,
      default: "",
    },

    videoStartedAt: {
      type: Date,
      default: null,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);