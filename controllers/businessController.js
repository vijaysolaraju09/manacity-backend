const User = require("../models/User");

// Create or update business profile
exports.createOrUpdateBusinessProfile = async (req, res) => {
  try {
    const updates = req.body;
    const allowed = [
      "businessName",
      "businessDescription",
      "businessCategory",
      "businessLogo",
      "businessImages",
      "businessHours",
      "businessContact",
      "businessLocation",
      "businessWebsite",
      "businessSocialLinks",
    ];

    const validUpdates = {};
    for (const key of allowed) {
      if (updates[key] !== undefined) {
        validUpdates[key] = updates[key];
      }
    }

    validUpdates.isBusiness = true;

    const user = await User.findByIdAndUpdate(req.user.id, validUpdates, {
      new: true,
    }).select("-password");

    res.json(user);
  } catch (err) {
    res
      .status(400)
      .json({ msg: "Business profile update failed", error: err.message });
  }
};

// Get all business users
exports.getAllBusinessUsers = async (req, res) => {
  try {
    const businessUsers = await User.find({ isBusiness: true }).select(
      "-password"
    );
    res.json(businessUsers);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to retrieve business users", error: err.message });
  }
};

// Get a specific business user by ID
exports.getBusinessUserById = async (req, res) => {
  try {
    const businessUser = await User.findById(req.params.id).select("-password");
    if (!businessUser || !businessUser.isBusiness) {
      return res.status(404).json({ msg: "Business user not found" });
    }
    res.json(businessUser);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to retrieve business user", error: err.message });
  }
};
