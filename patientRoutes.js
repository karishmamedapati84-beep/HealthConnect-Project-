const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
router.post("/", async (req, res) => {
    const patient = new Patient(req.body);
    await patient.save();
    res.json(patient);
});
router.get("/", async (req, res) => {
    const patients = await Patient.find();
    res.json(patients);
});

module.exports = router;