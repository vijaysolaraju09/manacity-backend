const router = require("express").Router();
const auth = require("../middleware/auth");
const requestController = require("../controllers/requestController");

// Submit verification request
router.post("/verify", auth, requestController.requestVerification);

// Admin: Get all verification requests
router.get("/admin", requestController.getAllVerificationRequests);

// Admin: Approve verification
router.post("/admin/approve/:userId", requestController.approveVerification);

module.exports = router;
