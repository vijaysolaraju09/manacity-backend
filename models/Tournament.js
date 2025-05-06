const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    date: String,
    time: String,
    location: String,
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    winner: { type: String, default: "" },
    adminMessage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tournament", TournamentSchema);
