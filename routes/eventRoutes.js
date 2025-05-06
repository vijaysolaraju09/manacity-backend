const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const auth = require("../middleware/auth");

router.post("/", auth, eventController.createEvent); // Admin only
router.get("/", auth, eventController.getAllEvents);
router.get("/:id", auth, eventController.getEventById);
router.post("/:id/register", auth, eventController.registerUser);
router.get("/my/events", auth, eventController.getMyEvents);

module.exports = router;
