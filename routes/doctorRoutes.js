const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
router.get("/", async (req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);

});
router.post("/", async (req, res) => {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.json({
        message: "Doctor added successfully",
        doctor: newDoctor
    });
});
router.delete("/:email", async (req, res) => {
    await Doctor.findOneAndDelete({ email: req.params.email });
    res.json({
        message: "Doctor deleted successfully"
    });
});
module.exports = router;