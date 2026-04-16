const axios = require("axios");
const config = require("../config/prokerala");

let accessToken = null;

let cachedKundli = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60000;

async function getAccessToken() {
  try {
    const response = await axios.post(
      config.TOKEN_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error("Token Error:", error.response?.data || error.message);
    throw error;
  }
}


async function callApi(endpoint, params) {
  if (!accessToken) {
    await getAccessToken();
  }

  try {
    const response = await axios.get(`${config.BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });

    return response.data;

  } catch (error) {

    if (error.response?.status === 401) {
      console.log("🔄 Token expired, refreshing...");
      await getAccessToken();

      const retry = await axios.get(`${config.BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });

      return retry.data;
    }

    throw error;
  }
}


async function getFullKundli(datetime, coordinates) {
  const now = Date.now();

  if (cachedKundli && now - lastFetchTime < CACHE_DURATION) {
    console.log("⚡ Returning cached kundli data");
    return cachedKundli;
  }

  const params = {
    datetime,
    coordinates,
    ayanamsa: 1,
  };

  const kundli = await callApi("/astrology/kundli", params);
  const planet = await callApi("/astrology/planet-position", params);
  const mangal = await callApi("/astrology/mangal-dosha", params);
  const sadeSati = await callApi("/astrology/sade-sati", params);
  const dasha = await callApi("/astrology/dasha-periods", params);

  const result = {
    kundli,
    planet,
    mangal,
    sadeSati,
    dasha,
  };

  cachedKundli = result;
  lastFetchTime = now;

  return result;
}


module.exports = {
  getFullKundli,
};
