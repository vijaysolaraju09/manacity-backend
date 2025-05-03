const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Place interest in a product
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Order failed" });
  }
});

// Get all orders for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.params.userId }).populate(
      "productId"
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

module.exports = router;
