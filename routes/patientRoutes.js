const express = require("express");
const router = express.Router();
const Patient = require("../models/patient"); 
const User = require("../models/User");       
const patientController = require("../controllers/patientcontroller");
router.post("/register", async (req, res) => {
    try {
        const { name, age, email, password } = req.body;
        const newPatient = new Patient({
            name,
            age,
            email,
            password
        });
        await newPatient.save();
        res.json({ message: "Patient registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Registration failed" });
    }
});
router.get("/", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: "Error fetching patients" });
    }

});
router.get("/profile/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile" });
    }
});
router.get("/history/:id", patientController.getHistory);
module.exports = router;