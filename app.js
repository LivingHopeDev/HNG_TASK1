const express = require("express");
require("dotenv").config();
const { getUserCityInfo } = require("./utils/getCity");
const app = express();
const port = process.env.PORT || 3001;

app.get("/api/hello", async (req, res) => {
  const { visitor_name } = req.query;
  const visitor_ip = req.ip;
  const locationInfo = await getUserCityInfo(visitor_ip); //102.88.62.83   57.128.168.243
  res.json({
    client_ip: visitor_ip,
    location: locationInfo.location.name,
    greetings: `Hello, ${visitor_name}!, the temperature is ${locationInfo.current.temp_c} degrees Celcius in ${locationInfo.location.name}`,
  });
});

app.listen(port, () => {
  console.log("App running on http://localhost:" + port);
});
