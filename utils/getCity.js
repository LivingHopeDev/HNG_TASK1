const axios = require("axios");
const getUserCity = async (ip) => {
  try {
    const apiKey = process.env.API_KEY;
    const token = process.env.TOKEN;

    const response = await axios.get(`https://ipinfo.io/${ip}?token=${token}`);
    console.log(response);
    return response.data.city;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};
// `https://api.ipdata.co/${ip}?api-key=${apiKey}`
module.exports = { getUserCity };
