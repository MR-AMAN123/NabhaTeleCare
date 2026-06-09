const express= require("express");

const {
  createAppointment,
  getAppointments,
  getMyAppointments,
} = require("../controllers/appointmentController.js");

const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post(
  "/",
  protect,
  createAppointment
);

router.get(
  "/",
  protect,
  getAppointments
);

router.get(
  "/my",
  protect,
  getMyAppointments
);

module.exports = router;;