const express = require("express");
const router = express.Router();
const User = require("../models/User");
router.post("/register", async (req, res) => {
    try {
        const { name, age, email, password,phone } = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.json({ message: "Email already registered" });
        }
        const newUser = new User({
            name,
            age,
            email,
            password,
            phone
        });
        await newUser.save();
        res.json({ message: "Registration successful" });
    } catch (error) {
        res.status(500).json({ message: "Registration failed" });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.json({ message: "User not found" });
        }
        if(user.password !== password){
            return res.json({ message: "Incorrect password" });
        }
        res.json({
            message: "Login successful",
            user: user
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
});
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});
router.delete("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed" });
    }
});
module.exports = router;