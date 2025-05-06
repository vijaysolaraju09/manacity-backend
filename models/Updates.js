const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Update", updateSchema);
