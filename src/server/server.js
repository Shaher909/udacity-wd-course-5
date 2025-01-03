// Setup empty JS object to act as endpoint for all routes
projectData = {};

// APIs credentials and endpoints
const geoNamesApiBaseURL = "http://api.geonames.org/geoCodeAddressJSON?";
const geoNamesApiUsername = "";
const WeatherbitApiBaseURL = "https://api.weatherbit.io/v2.0/";
const WeatherbitApiKey = "";

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use the built-in middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Setup Server
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

// POST request to handle form submission
app.post("/submit", function (req, res) {
  newRecord = {
    city: req.body.city,
    departureDate: req.body.departureDate,
    country: req.body.country,
    whatever: "my additional data .. hehe",
  };

  projectData = newRecord;
  console.log(projectData);
  //fetchGeoCoordinates(newRecord.country, newRecord.city, geoNamesApiBaseURL);
  fetchWeatherData(2.38332, 48.82725);
  res.send(projectData);
});

// GET request to fetch the geo coordinates data
const fetchGeoCoordinates = async (country, city) => {
  const request = await fetch(
    `${geoNamesApiBaseURL}q=${city}&countryCode=${country}&username=${geoNamesApiUsername}`
  );

  try {
    const data = await request.json();
    const longitude = data.address.lng;
    const latitude = data.address.lat;
    console.log(longitude, " ", latitude);
  } catch (error) {
    console.log("Error: API connection failed, additional information:", error);
  }
};

// Get request to fetch the weather data
const fetchWeatherData = async (longitude, latitude) => {
  const request = await fetch(
    `${WeatherbitApiBaseURL}current?lat=${latitude}&lon=${longitude}&key=${WeatherbitApiKey}`
  );

  //https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely

  console.log(
    `${WeatherbitApiBaseURL}current?lat=${latitude}&lon=${longitude}&key=${WeatherbitApiKey}`
  );

  try {
    const data = await request.json();
    weatherDescription = data.data[0].weather.description;
    weatherCurrentTemp = data.data[0].temp;
    //data.
  } catch (error) {
    console.log("Error: API connection failed, additional information:", error);
  }
};
