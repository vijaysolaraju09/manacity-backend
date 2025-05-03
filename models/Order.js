const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    message: String,
    status: {
      type: String,
      enum: ["interested", "completed"],
      default: "interested",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
