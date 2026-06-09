const HealthRecord = require("../models/HealthRecord");

const createHealthRecord = async (req, res) => {
  try {
    const record =
      await HealthRecord.create({
        patient: req.body.patient,
        doctor: req.user._id,
        diagnosis: req.body.diagnosis,
        prescription: req.body.prescription,
        notes: req.body.notes,
      });

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

const getMyRecords = async (req, res) => {
  try {
    const records =
      await HealthRecord.find({
        patient: req.user._id,
      })
        .populate("doctor", "name email")
        .sort({ createdAt: -1 });

    res.json({
      success: true,
      records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createHealthRecord,
  getMyRecords,
};