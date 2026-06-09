const Medicine = require("../models/Medicine");

const getMedicineAnalytics =
  async (req, res) => {
    try {
      const medicines =
        await Medicine.find();

      const lowStock =
        medicines.filter(
          (medicine) =>
            medicine.quantity <= 10
        );

      const outOfStock =
        medicines.filter(
          (medicine) =>
            medicine.quantity === 0
        );

      res.json({
        success: true,

        totalMedicines:
          medicines.length,

        lowStockCount:
          lowStock.length,

        outOfStockCount:
          outOfStock.length,

        lowStock,
        outOfStock,
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
  getMedicineAnalytics,
};