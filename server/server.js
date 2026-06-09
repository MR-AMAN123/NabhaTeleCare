require("dotenv").config();

const appointmentRoutes = require("./routes/appointmentRoutes");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const healthRecordRoutes = require(
  "./routes/healthRecordRoutes"
);

const medicineRoutes = require(
  "./routes/medicineRoutes"
);

const doctorRoutes = require(
  "./routes/doctorRoutes"
);

const doctorDashboardRoutes =
require(
"./routes/doctorDashboardRoutes"
);

const symptomRoutes = require(
"./routes/symptomRoutes"
);

const adminRoutes =
require("./routes/adminRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(
  "/api/appointments",
  appointmentRoutes
);

app.use(
  "/api/health-records",
  healthRecordRoutes
);

app.use(
  "/api/medicines",
  medicineRoutes
);

app.use("/api/symptoms", symptomRoutes);
app.use("/api/doctors", doctorRoutes);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
"/api/doctor",
doctorDashboardRoutes
);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});