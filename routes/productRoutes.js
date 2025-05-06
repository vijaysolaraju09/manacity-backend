const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const productController = require("../controllers/productController");

// Routes
router.get("/admin", auth, productController.getAdminProducts);
router.get("/shop/:shopId", auth, productController.getProductsByShop);
router.get("/special", auth, productController.getSpecialShopProducts); // ✅ Added
router.get("/:id", auth, productController.getProductById);

module.exports = router;
