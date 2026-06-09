const express = require("express");

const router = express.Router();

const {
  createHealthRecord,
  getMyRecords,
} = require(
  "../controllers/healthRecordController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  createHealthRecord
);

router.get(
  "/my-records",
  protect,
  getMyRecords
);

module.exports = router;