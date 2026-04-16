const Video = require("../models/Video");



exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get - Get All Videos response.

exports.getAllVideos = async (req, res) => {
  try {

    const videos = await Video.find();

    const result = {
      free: [],
      entry: [],
      advance: [],
    };

    videos.forEach((video) => {
      if (result[video.type]) {
        result[video.type].push({
          id: video._id,
          videoUrl: video.videoUrl,
          type: video.type,
        });
      }
    });

    res.status(200).json({
      success: true,
      message: "All videos fetched successfully",

      freeVideos: {
        count: result.free.length,
        videos: result.free,
      },

      entryVideos: {
        count: result.entry.length,
        videos: result.entry,
      },

      advanceVideos: {
        count: result.advance.length,
        videos: result.advance,
      },

    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};




// POST - CUSTOM VIDEO RESPONSE
exports.getVideoStructured = async (req, res) => {
  try {

    const videos = await Video.find();

    console.log("All Video In DB:", videos);



    // Default buckets (never undefined)
    const result = {
      free: [],
      entry: [],
      advance: [],
    };

   videos.forEach((video) => {
      if (result[video.type]) {
        result[video.type].push({
         id: video._id,
         videoUrl: video.videoUrl
       });
      }
    });
    console.log("structured Result:",result);
    res.status(200).json({
      success: true,
      message: "Video fetch successfully",

      type: [
        {
          type: "free videos",
          Tcount: result.free.length,
          videos: result.free,
        },
      ],

      type2: [
        {
          type: "entry Level",
          count: result.entry.length,
          videos: result.entry,
        },
      ],

      type3: [
        {
          type: "advance level",
          count: result.advance.length,
          videos: result.advance,
        },
      ],
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



// GET BY STAGE (optional keep)
// exports.getByStage = async (req, res) => {
//   try {
//     const stage = Number(req.params.stage);
//     const videos = await Video.find({ stage });

//     res.status(200).json({
//       success: true,
//       count: videos.length,
//       data: videos,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };





   exports.addVideo = async (req, res) => {
  try {
    console.log("FULL BODY:", req.body);
    console.log("videoUrl:", req.body.videoUrl);
    console.log("type:", req.body.type);

    const {  userId, type,videoUrl } = req.body;

    if (!type || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Type and videoUrl are required",
      });
    }
    const existingCount = await Video.countDocuments({type});

    if (
      (type === "free" && existingCount >= 6)
    ){
      return res.status(400).json({
        success: false,
        message: `Cannot add more than 6 videos for ${type} type`,
      });
    };

    if (
      (type === "entry" && existingCount >= 1)
    ){
      return res.status(400).json({
        success: false,
        message: `Cannot add more than 1 videos for ${type} type`,
      });
    }

    if (
      (type === "advance" && existingCount >= 1)
   ){
      return res.status(400).json({
        success: false,
        message: `Cannot add more than 1 videos for ${type} type`,
      });
    }
    const video = new Video({
     videoUrl,
      type,
    });

    await video.save();

    res.status(200).json({
      success: true,
      message: "Video added successfully",
      data: video,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// delete - Video Delete Api

exports.deleteVideo = async (req, res) => {
  try {

    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    await Video.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
