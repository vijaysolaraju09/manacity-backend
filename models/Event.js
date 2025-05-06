const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    image: String,
    category: String,
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    registeredUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    adminMessage: {
      type: String, // can contain HTML tags (like <img>, <a>, etc.)
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
