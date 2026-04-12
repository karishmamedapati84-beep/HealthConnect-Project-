const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: Number
    },
    phone: {          
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: "patient"
    }
});
module.exports = mongoose.model("User", UserSchema);