const prokeralaService = require("../services/prokeralaService");

exports.getKundli = async (req, res) => {
  try {
    let { datetime, coordinates } = req.query;

    if (!datetime || !coordinates) {
      return res.status(400).json({
        success: false,
        message: "datetime and coordinates required",
      });
    }

    // Fix datetime if '+' converted to space
    datetime = datetime.replace(" ", "+");

    const data = await prokeralaService.getFullKundli(datetime, coordinates);

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Error fetching kundli",
      error: error.response?.data || error.message,
    });
  }
};
