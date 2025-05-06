const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const auth = require("../middleware/auth");

// Get user notifications
router.get("/", auth, async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json({ notifications });
});

// Delete one after viewing
router.delete("/:id", auth, async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({ msg: "Removed" });
});

module.exports = router;
