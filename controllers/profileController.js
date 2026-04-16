const User = require("../models/User");


// UPDATE Profile (No Auth)
exports.updateProfile = async (req, res) => {
  try {
    const { userId, name, email, address, dob, birthPlace } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update fields if provided
    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.address;
    user.dob = dob || user.dob;
    user.birthPlace = birthPlace || user.birthPlace;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// GET Profile (Current Login User)
exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ userId }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET Profile by userId (No Auth)
exports.getProfileById = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const user = await User.findOne({ userId }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
