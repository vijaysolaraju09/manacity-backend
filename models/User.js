const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String },
    profilePic: { type: String },
    profession: { type: String },
    isBusiness: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    address: { type: String },
    businessName: { type: String },
    businessDescription: { type: String },
    businessCategory: { type: String },
    businessLogo: { type: String },
    businessImages: [{ type: String }],
    businessHours: { type: String },
    businessContact: { type: String },
    businessLocation: { type: String },
    businessWebsite: { type: String },
    businessSocialLinks: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
    },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
