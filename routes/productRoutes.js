const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create new product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Product creation failed" });
  }
});

// Get all products by owner
router.get("/business/:ownerId", async (req, res) => {
  try {
    const products = await Product.find({ ownerId: req.params.ownerId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch products" });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
