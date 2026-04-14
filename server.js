const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const authRoutes = require("./routes/authRoutes");
app.get("/", (req, res) => {
    res.send("HealthConnect Backend is Running Successfully");
});
app.use("/api/doctors", doctorRoutes);       
app.use("/api/patients", patientRoutes);      
app.use("/api/appointments", appointmentRoutes); 
app.use("/api/auth", authRoutes);          
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});