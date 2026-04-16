const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["free", "entry", "advance"],
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);

