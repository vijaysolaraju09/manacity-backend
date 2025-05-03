const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "business", "admin"], default: "user" },
  name: String,
  occupation: String,
  profilePic: String,
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);
