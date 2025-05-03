const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all verified users
router.get("/", async (req, res) => {
  try {
    const verifiedUsers = await User.find({ verified: true });
    res.json(verifiedUsers);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// Mark user as verified (admin action)
router.put("/:id/verify", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Verification failed" });
  }
});

module.exports = router;
