const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: String,
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
