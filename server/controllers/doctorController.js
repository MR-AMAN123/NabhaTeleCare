const User = require("../models/User");

const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({
      role: "DOCTOR",
    }).select("name email");

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDoctors,
};