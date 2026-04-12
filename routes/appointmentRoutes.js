const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments" });
    }

});
router.post("/", async (req, res) => {
    try {
        const newAppointment = new Appointment({
            patientId: req.body.patientId,
            patientName: req.body.patientName,
            email: req.body.email,
            age: req.body.age,
            department: req.body.department,
            service: req.body.service,
            date: req.body.date,
            doctor: req.body.doctor
        });
        await newAppointment.save();
        res.json({
            message: "Appointment booked successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Error booking appointment" });
    }

})
router.get("/history/:id", async (req, res) => {
    try {
        const appointments = await Appointment.find({
            patientId: req.params.id
        });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching history" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({
            message: "Appointment deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting appointment" });
    }
});
module.exports = router;