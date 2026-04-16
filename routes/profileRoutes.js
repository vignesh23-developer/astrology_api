const express = require("express");
const router = express.Router();

const auth = require("../middleware/authmiddleware");
const { updateProfile, getProfile, getProfileById } = require("../controllers/profileController");

// Update Profile
router.post("/update", updateProfile);

// Get Profile
router.get("/get", getProfile);

//get Profile by userId
router.get("/:id", getProfileById);


module.exports = router;
