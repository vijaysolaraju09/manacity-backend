const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "supersecretmanacitykey";

exports.signup = async (req, res) => {
  const { name, phone, password, location, email } = req.body;
  try {
    const existing = await User.findOne({ phone });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      phone,
      password: hashed,
      location,
      email,
    });

    const token = jwt.sign({ id: user._id, phone: user.phone }, SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: "Signup failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  console.log(phone, password);

  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, phone: user.phone }, SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(401).json({ msg: "Unauthorized" });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    res.json({ msg: "Profile updated", user });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to update profile", error: err.message });
  }
};
