const express = require("express");

const {
  getStats,
} = require(
  "../controllers/adminController"
);

const { protect } = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

const {
  getDoctorWorkload,
} = require(
  "../controllers/adminAnalyticsController"
);

const {
  getMedicineAnalytics,
} = require(
  "../controllers/medicineAnalyticsController"
);

router.get(
  "/doctor-workload",
  protect,
  getDoctorWorkload
);

router.get(
  "/medicine-analytics",
  protect,
  getMedicineAnalytics
);

router.get(
  "/stats",
  protect,
  getStats
);

module.exports = router;