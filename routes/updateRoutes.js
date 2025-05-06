const express = require("express");
const router = express.Router();
const Update = require("../models/Update");

router.post("/", async (req, res) => {
  try {
    const update = await Update.create(req.body);
    res.json(update);
  } catch (err) {
    res.status(500).json({ msg: "Failed to post update", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const updates = await Update.find().sort({ createdAt: -1 });
    res.json(updates);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to fetch updates", error: err.message });
  }
});

module.exports = router;
