const Appointment = require("../models/Appointment");

const getDoctorWorkload =
  async (req, res) => {
    try {
      const workload =
        await Appointment.aggregate([
          {
            $group: {
              _id: "$doctor",
              totalAppointments: {
                $sum: 1,
              },
            },
          },

          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "doctor",
            },
          },

          {
            $unwind: "$doctor",
          },

          {
            $project: {
              _id: 0,

              doctorName:
                "$doctor.name",

              totalAppointments:
                1,
            },
          },
        ]);

      res.json({
        success: true,
        workload,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports = {
  getDoctorWorkload,
};