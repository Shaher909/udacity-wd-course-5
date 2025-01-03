// Setup empty JS object to act as endpoint for all routes
projectData = {};

// APIs credentials and endpoints
const geoNamesApiBaseURL = "http://api.geonames.org/geoCodeAddressJSON?";
const geoNamesApiUsername = "";
const WeatherbitApiBaseURL = "https://api.weatherbit.io/v2.0/";
const WeatherbitApiKey = "";
const pixabayApiBaseURL = "https://pixabay.com/api/?";
const pixabayApiKey = "";

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Create date object to get the current date
let currentServerDate = new Date();

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
  fetchWeatherData(2.38332, 48.82725, projectData.departureDate);
  //fetchImage("paris");

  console.log();
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
const fetchWeatherData = async (longitude, latitude, departureDate) => {
  daysDifference = calculateRemainingDays(departureDate, currentServerDate);
  let request;
  let weatherType;

  if (daysDifference < 7) {
    request = await fetch(
      `${WeatherbitApiBaseURL}current?lat=${latitude}&lon=${longitude}&key=${WeatherbitApiKey}`
    );
    weatherType = "current";
  } else {
    request = await fetch(
      `${WeatherbitApiBaseURL}forecast/daily?lat=${latitude}&lon=${longitude}&key=${WeatherbitApiKey}`
    );
    weatherType = "forecast";
  }

  try {
    const data = await request.json();
    weatherDescription = data.data[0].weather.description;
    weatherCurrentTemp = data.data[0].temp;
    if (weatherType === "forecast") {
      weatherHighTemp = data?.data?.[0]?.high_temp ?? null;
      weatherLowTemp = data?.data?.[0]?.low_temp ?? null;
      console.log(
        weatherDescription +
          " High: " +
          weatherHighTemp +
          " Low: " +
          weatherLowTemp
      );
    } else {
      console.log(weatherDescription + " Temp: " + weatherCurrentTemp);
    }
  } catch (error) {
    console.log("Error: API connection failed, additional information:", error);
  }
};

// Get request to fetch city image
const fetchImage = async (cityName) => {
  const request = await fetch(
    `${pixabayApiBaseURL}key=${pixabayApiKey}&q=${cityName}&image_type=photo`
  );

  try {
    const data = await request.json();
    const imageURL = data.hits[0].webformatURL;
  } catch (error) {
    console.log("Error: API connection failed, additional information:", error);
  }
};

// a function to calculate the remaining days to the trip
const calculateRemainingDays = (departureDate, currentDate) => {
  // Parse the data from the form to be a date object for comparison
  const parsedDepartureDate = new Date(departureDate);
  const timeDifference = parsedDepartureDate - currentDate;
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return dayDifference;
};
