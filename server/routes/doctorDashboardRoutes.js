const express = require("express");

const {
  getDoctorAppointments,
  approveAppointment,
  rejectAppointment,
  createRecordFromAppointment,
  startVideoCall,
} = require(
  "../controllers/doctorDashboardController"
);

const { protect } = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.get(
  "/appointments",
  protect,
  getDoctorAppointments
);

router.put(
  "/appointments/:id/approve",
  protect,
  approveAppointment
);

router.put(
  "/appointments/:id/reject",
  protect,
  rejectAppointment
);

router.post(
  "/appointments/:id/record",
  protect,
  createRecordFromAppointment
);

router.post(
  "/appointments/:id/start-video",
  protect,
  startVideoCall
);

module.exports = router;