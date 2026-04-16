const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false
    }
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    // Profile Fields
    address: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
    },
    birthPlace: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
