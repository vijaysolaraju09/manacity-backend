const router = require("express").Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", auth, authController.getMe);
router.put("/me", auth, authController.updateProfile);
module.exports = router;
