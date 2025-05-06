const router = require("express").Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");

router.post("/add", auth, cartController.addToCart);
router.get("/", auth, cartController.getMyCart);
router.put("/update/:id", auth, cartController.updateQuantity);
router.delete("/remove/:id", auth, cartController.removeItem);

module.exports = router;
