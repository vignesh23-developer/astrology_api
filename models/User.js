const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId:{
      type:Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_no:{
      type: String,
    },
    dob:{
      type:Date
    },
    address:{
     type: String,
     required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
