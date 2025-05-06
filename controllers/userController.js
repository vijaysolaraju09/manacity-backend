const User = require("../models/User");

exports.editProfile = async (req, res) => {
  try {
    const updates = req.body;
    const allowed = [
      "name",
      "email",
      "location",
      "profilePic",
      "profession",
      "isBusiness",
    ];

    const validUpdates = {};
    for (const key of allowed) {
      if (updates[key] !== undefined) {
        validUpdates[key] = updates[key];
      }
    }

    const user = await User.findByIdAndUpdate(req.user.id, validUpdates, {
      new: true,
    }).select("-password");

    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: "Profile update failed", error: err.message });
  }
};
