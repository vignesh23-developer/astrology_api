const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://yamirukabayamen2026_db_user:yb2026success@cluster0.lv0rog6.mongodb.net/video_api_db?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

module.exports = connectDB;
