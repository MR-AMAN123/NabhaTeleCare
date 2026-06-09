const express = require("express");

const {
  addMedicine,
  getMedicines,
  searchMedicine,
  reserveMedicine,
  getPharmacyReservations,
  confirmReservation,
  cancelReservation,
    getMyReservations,
} = require("../controllers/medicineController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addMedicine);

router.get("/", protect, getMedicines);

router.get("/search", protect, searchMedicine);

router.post("/reserve", protect, reserveMedicine);

router.get(
 "/reservations",
 protect,
 getPharmacyReservations
);

router.put(
 "/reservation/:id/confirm",
 protect,
 confirmReservation
);

router.put(
 "/reservation/:id/cancel",
 protect,
 cancelReservation
);

router.get(
  "/my-reservations",
  protect,
  getMyReservations
);

module.exports = router;
