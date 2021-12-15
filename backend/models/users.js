const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        username: String,
        email: String,
        password: String,
        address: String,
        city: String,
        state: String,
        zipcode: Number,
        phone: Number,
        active: Boolean,
    },
    { collection: "users" }
);

const User = new mongoose.model("User", UserSchema);

module.exports = User;

