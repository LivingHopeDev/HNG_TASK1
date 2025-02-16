const express = require("express");
const expressip = require("express-ip");
require("dotenv").config();
const { getUserCityInfo } = require("./utils/getCity");
const app = express();
const port = process.env.PORT || 3001;
app.use(expressip().getIpInfoMiddleware);

app.get("/api/hello", async (req, res) => {
  const { visitor_name } = req.query;
  const ipAddress = req.ipInfo;
  const visitor_ip = ipAddress.ip.split(",")[0];
  const locationInfo = await getUserCityInfo(visitor_ip);
  res.json({
    client_ip: visitor_ip,
    location: locationInfo?.location?.name,
    greeting: `Hello, ${visitor_name}!, the temperature is ${locationInfo?.current?.temp_c} degrees Celcius in ${locationInfo?.location?.name}`,
  });
});
// Handles non existent routes
app.all("*", (req, res) => {
  res.status(404).send({ error: "Route not found" });
});

app.listen(port, () => {
  console.log("App running on http://localhost:" + port);
});
