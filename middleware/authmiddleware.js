const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Convert to Number
    const userId = Number(decoded.userId);

    if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId in token" });
    }

    req.userId = userId;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: err.message,
    });
  }
};
