const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    image: String,
    maxParticipants: Number,
    registered: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    approved: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    adminMessage: String,
    registrationEndsAt: Date,
    tournamentStartsAt: Date,
    tournamentEndsAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tournament", tournamentSchema);
