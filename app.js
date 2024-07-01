const express = require("express");
require("dotenv").config();
const expressip = require("express-ip");
const { getUserCity } = require("./utils/getCity");
const app = express();
const port = process.env.PORT || 3001;

app.use(expressip().getIpInfoMiddleware);

app.get("/api/hello", async (req, res) => {
  const { visitor_name } = req.query;
  const ipAddress = req.ipInfo;
  const visitor_ip = ipAddress.ip.split(",")[0];
  const city = await getUserCity(visitor_ip); //102.88.62.83   57.128.168.243

  res.end(
    JSON.stringify({
      client_ip: visitor_ip,
      location: city,
      greetings: `Hello, ${visitor_name}`,
    })
  );
});

// const app = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url);

//   if (parsedUrl.pathname === "/api/hello" && req.method === "GET") {
//     const visitor = url.parse(req.url, true).query.visitor_name;

//     const ipAddress = req.socket.remoteAddress;
//     const formattedIp = ipAddress.split(":")[3];
//     console.log(ipAddress);
//     // const getUserCity = async (ip) => {
//     //   try {
//     //     const apiKey = "YOUR_IPDATA_API_KEY";
//     //     const response = await axios.get(
//     //       `https://api.ipdata.co/${ip}?api-key=${apiKey}`
//     //     );
//     //     return response.data.city;
//     //   } catch (error) {
//     //     console.error("Error fetching location data:", error);
//     //     return null;
//     //   }
//     // };

//     // // Call the function and update the response
//     // getUserCity(formattedIp)
//     //   .then((city) => {
//     //     const location = city ? city : "Unknown";
//     //     res.writeHead(200, { "Content-Type": "application/json" });
//     //     res.end(
//     //       JSON.stringify({
//     //         client_ip: formattedIp,
//     //         location: location,
//     //         greetings: `Hello, ${visitor}`,
//     //       })
//     //     );
//     //   })
//     //   .catch((error) => {
//     //     console.error("Error:", error);
//     //     res.end(JSON.stringify({ error: "Error fetching location" })); // Handle errors
//     //   });
//   }

// });

app.listen(port, () => {
  console.log("App running on http://localhost:" + port);
});
