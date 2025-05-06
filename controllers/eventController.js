const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create event", error: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch events", error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: "Event not found", error: err.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.registeredUsers.includes(req.user.id)) {
      event.registeredUsers.push(req.user.id);
      await event.save();
    }
    res.json({ msg: "Registered successfully", event });
  } catch (err) {
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ registeredUsers: req.user.id });
    res.json(events);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to fetch your events", error: err.message });
  }
};
