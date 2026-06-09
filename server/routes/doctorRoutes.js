const express = require("express");

const {
  getDoctors,
} = require("../controllers/doctorController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getDoctors);

module.exports = router;