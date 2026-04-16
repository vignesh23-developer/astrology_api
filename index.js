console.log("🔥 index.js started successfully");
require("dotenv").config();
const { exec } = require("child_process");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const prokeralaRoutes = require("./routes/prokeralaRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.send("Node /api/test is working");
});

app.get("/test", (req, res) => {
  res.json({ status: "API WORKING" });
});

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/prokerala", prokeralaRoutes);


app.post("/webhook", (req, res) => {
  const cmd = `
    cd /var/www/video-api/Video_API_Node.js &&
    git pull origin main &&
    npm install &&
    pm2 restart video-api
  `;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ ERROR:", error);
      console.error("STDERR:", stderr);
      return res.status(500).send("Deploy failed");
    }

    console.log("✅ OUTPUT:", stdout);
    res.send("🚀 Deploy successful");
  });
});

connectDB()
  .then(() => {
    app.listen(3000, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });

