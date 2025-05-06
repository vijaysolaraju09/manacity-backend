const Request = require("../models/Request");
const User = require("../models/User");

// User requests verification
exports.requestVerification = async (req, res) => {
  try {
    const existing = await Request.findOne({
      userId: req.user.id,
      type: "verification",
      status: "pending",
    });

    if (existing)
      return res.status(400).json({ msg: "Request already pending" });

    const request = await Request.create({
      userId: req.user.id,
      type: "verification",
      status: "pending",
      message: req.body.message || "",
    });

    res.json({ msg: "Request submitted", request });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to submit request", error: err.message });
  }
};

// Admin gets all verification requests
exports.getAllVerificationRequests = async (req, res) => {
  try {
    const requests = await Request.find({ type: "verification" })
      .populate("userId", "-password")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to fetch requests", error: err.message });
  }
};

// Admin approves verification request
exports.approveVerification = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.isVerified = true;
    await user.save();

    await Request.updateMany(
      { userId: user._id, type: "verification", status: "pending" },
      { status: "approved" }
    );

    res.json({ msg: "User verified", user });
  } catch (err) {
    res.status(500).json({ msg: "Failed to approve", error: err.message });
  }
};
