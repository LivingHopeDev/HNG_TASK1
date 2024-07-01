const express = require("express");
require("dotenv").config();
const { getUserCity } = require("./utils/getCity");
const app = express();
const port = process.env.PORT || 3001;

app.get("/api/hello", async (req, res) => {
  const { visitor_name } = req.query;
  const visitor_ip = req.ip;
  const city = await getUserCity(visitor_ip); //102.88.62.83   57.128.168.243

  res.json({
    client_ip: visitor_ip,
    location: city,
    greetings: `Hello, ${visitor_name}!, the temperature is 11 degrees Celcius in ${city}`,
  });
});

app.listen(port, () => {
  console.log("App running on http://localhost:" + port);
});
