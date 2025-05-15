const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.WEATHER_API_KEY;

app.get("/weather", async (req, res) => {
  const { city, lat, lon } = req.query;

  let apiUrl = "";

  if (city) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  } else if (lat && lon) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  } else {
    return res.status(400).json({ error: "City or coordinates are required" });
  }

  const response = await axios.get(apiUrl);
  res.json(response.data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
