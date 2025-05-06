const Product = require("../models/Product");

// Admin-added products (for special shop)
exports.getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find({ isSpecial: true });
    res.json({ products });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to fetch admin products", error: err.message });
  }
};

// Products from a specific shop
exports.getProductsByShop = async (req, res) => {
  try {
    const products = await Product.find({ shopId: req.params.shopId });
    res.json({ products });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to fetch shop products", error: err.message });
  }
};

// Special Shop Products route (for Home)
exports.getSpecialShopProducts = async (req, res) => {
  try {
    const products = await Product.find({ isSpecial: true });
    res.json({ products });
  } catch (err) {
    res
      .status(500)
      .json({
        msg: "Failed to fetch special shop products",
        error: err.message,
      });
  }
};

// Single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json({ product });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to fetch product", error: err.message });
  }
};
