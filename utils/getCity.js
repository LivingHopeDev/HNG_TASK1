const axios = require("axios");
const getUserCityInfo = async (ip) => {
  try {
    const apiKey = process.env.API_KEY;
    const response =
      await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ip}
`);
    return response.data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};

https: module.exports = { getUserCityInfo };
