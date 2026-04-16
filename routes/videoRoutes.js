const express = require("express");
const router = express.Router();

const auth = require("../middleware/authmiddleware");

const {
  addVideo,
  getAllVideos,
  getVideoStructured,
  deleteVideo
} = require("../controllers/videoController");

// add video
router.post("/",addVideo);

// Admin Video Api
router.get("/all", getAllVideos);

//structured videos
router.post("/structured",getVideoStructured);

router.delete("/:id",deleteVideo);

module.exports = router;
