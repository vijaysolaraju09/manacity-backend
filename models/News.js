const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    publishDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
