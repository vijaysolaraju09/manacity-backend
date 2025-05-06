const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// Get all verified users
router.get("/verified", async (req, res) => {
  try {
    const verifiedUsers = await User.find({ isVerified: true }).select(
      "-password"
    );
    res.json(verifiedUsers);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to fetch verified users", error: err.message });
  }
});

// Get all business users
router.get("/business", auth, async (req, res) => {
  const users = await User.find({ role: "business" });
  res.json({ users });
});

// Get user by ID
router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ user });
});

module.exports = router;
