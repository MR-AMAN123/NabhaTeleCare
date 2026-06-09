const Appointment = require("../models/Appointment");
const HealthRecord = require("../models/HealthRecord");

// Get Doctor Appointments
const getDoctorAppointments = async (
  req,
  res
) => {
  try {
    const appointments =
      await Appointment.find({
        doctor: req.user._id,
      })
        .populate(
          "patient",
          "name email phone"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Approve Appointment
const approveAppointment = async (
  req,
  res
) => {
  try {
    const appointment =
      await Appointment.findById(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found",
      });
    }

    appointment.status =
      "APPROVED";

    appointment.meetingRoom = `telemed-${appointment._id}`;

    await appointment.save();

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject Appointment
const rejectAppointment = async (
  req,
  res
) => {
  try {
    const appointment =
      await Appointment.findById(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found",
      });
    }

    appointment.status =
      "REJECTED";

    await appointment.save();

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Start Video Call
const startVideoCall = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const meetingRoom =
      appointment.meetingRoom || `telemed-${appointment._id}`;

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        meetingRoom,
        videoStartedAt: new Date(),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      appointment: updated,
      message: "Patient has been notified. Video call started.",
    });
  } catch (error) {
    console.error("startVideoCall error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Health Record
const createRecordFromAppointment =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findById(
          req.params.id
        );

      if (!appointment) {
        return res.status(404).json({
          success: false,
          message:
            "Appointment not found",
        });
      }

      const record =
        await HealthRecord.create({
          patient:
            appointment.patient,
          doctor: req.user._id,
          diagnosis:
            req.body.diagnosis,
          prescription:
            req.body.prescription,
          notes: req.body.notes,
        });

      appointment.status =
        "COMPLETED";

      await appointment.save();

      res.status(201).json({
        success: true,
        record,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  getDoctorAppointments,
  approveAppointment,
  rejectAppointment,
  createRecordFromAppointment,
  startVideoCall,
};