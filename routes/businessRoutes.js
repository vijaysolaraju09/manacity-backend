const router = require("express").Router();
const auth = require("../middleware/auth");
const businessController = require("../controllers/businessController");

// Create or update business profile
router.post("/create", auth, businessController.createOrUpdateBusinessProfile);

// Get all business users
router.get("/all", businessController.getAllBusinessUsers);

// Get a specific business user by ID
router.get("/:id", businessController.getBusinessUserById);

module.exports = router;
