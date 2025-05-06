const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String,
    isSpecial: { type: Boolean, default: false },
    isOffer: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
