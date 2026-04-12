const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: String,
    department: String,
    experience: Number,
    email: String
});

module.exports = mongoose.model("Doctor", doctorSchema);