const express = require("express");
const router = express.Router();
const Tournament = require("../models/Tournament");

// Create tournament
router.post("/", async (req, res) => {
  try {
    const tournament = await Tournament.create(req.body);
    res.json(tournament);
  } catch (err) {
    res.status(400).json({ error: "Tournament creation failed" });
  }
});

// Get all tournaments
router.get("/", async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// Register for tournament
router.post("/:id/register", async (req, res) => {
  const { userId } = req.body;
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament.registered.includes(userId)) {
      tournament.registered.push(userId);
      await tournament.save();
    }
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router;
