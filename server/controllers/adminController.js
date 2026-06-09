const User = require("../models/User");
const Appointment = require("../models/Appointment");
const HealthRecord = require("../models/HealthRecord");

const getStats = async (req, res) => {
  try {

    const totalPatients =
      await User.countDocuments({
        role: "PATIENT",
      });

    const totalDoctors =
      await User.countDocuments({
        role: "DOCTOR",
      });

    const totalAppointments =
      await Appointment.countDocuments();

    const totalRecords =
      await HealthRecord.countDocuments();

    res.json({
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalRecords,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getStats,
};