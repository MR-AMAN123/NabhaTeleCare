const express = require("express");

const {
  checkSymptoms,
} = require(
  "../controllers/symptomController"
);

const { protect } = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.post(
  "/",
  protect,
  checkSymptoms
);

module.exports = router;