const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  patientName: String,
  email:String,
  age: Number,
  department: String,
  service: String,
  doctor: String,
  date: String
});

module.exports = mongoose.model("Appointment", appointmentSchema);