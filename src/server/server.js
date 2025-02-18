// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const fetch = require("node-fetch");
global.fetch = fetch;

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

// Setup Server & start it when executed only
const startServer = () => {
  app.listen(8080, () => {
    console.log("Example app listening on port 8080!");
  });
};

// Only start the server if this file is executed directly (not imported in a test)
if (require.main === module) {
  startServer();
}

// POST request to handle form submission
app.post("/submit", async function (req, res) {
  const tripRecord = {
    city: req.body.city,
    departureDate: req.body.departureDate,
    country: req.body.country,
  };

  try {
    //Chain of functions to fetch all the necessary details
    const { longitude, latitude } = await fetchGeoCoordinates(
      tripRecord.country,
      tripRecord.city
    );
    const weatherData = await fetchWeatherData(
      longitude,
      latitude,
      tripRecord.departureDate
    );
    const imageURL = await fetchImage(tripRecord.city);
    const daysRemaining = calculateRemainingDays(
      tripRecord.departureDate,
      currentServerDate
    );

    //Construct the ojbect with full data to be sent to the client
    projectData = {
      ...tripRecord,
      ...weatherData,
      imageURL: imageURL,
      daysCount: daysRemaining,
    };

    console.log(projectData);
    res.send(projectData);
  } catch (e) {
    console.log(
      "Something went wrong in the information fetching, check logs for more details: ensure your API keys are valid & working" +
        e
    );
    const errorResponse = {
      faultyEntry:
        "Info can't be retrieved, please check if the city is valid for the country",
      error: e,
    };
    res.send(errorResponse);
  }
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
    console.log("Longitude: " + longitude + " Latitude: " + latitude);
    return { longitude, latitude };
  } catch (error) {
    console.log(
      "Error: GeoNames API connection failed, additional information:",
      error
    );
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
    const weatherDescription = data.data[0].weather.description;
    const weatherTemp = data.data[0].temp;
    let weatherHighTemp = null;
    let weatherLowTemp = null;

    if (weatherType === "forecast") {
      weatherHighTemp = data?.data?.[0]?.high_temp ?? null;
      weatherLowTemp = data?.data?.[0]?.low_temp ?? null;
      console.log(
        `${weatherType} : ${weatherDescription} High: ${weatherHighTemp} Low: ${weatherLowTemp}`
      );
    } else {
      console.log(
        `${weatherType} : ${weatherDescription} Temp: ${weatherTemp}`
      );
    }

    return {
      weatherType,
      weatherDescription,
      weatherTemp,
      weatherHighTemp,
      weatherLowTemp,
    };
  } catch (error) {
    console.log(
      "Error: Weather Info API connection failed, additional information:",
      error
    );
  }
};

// Get request to fetch city image
const fetchImage = async (cityName) => {
  const request = await fetch(
    `${pixabayApiBaseURL}key=${pixabayApiKey}&q=${cityName}&image_type=photo`
  );

  try {
    const data = await request.json();
    const imageURL = data.hits?.[0]?.webformatURL ?? null;
    console.log(imageURL);
    return imageURL;
  } catch (error) {
    console.log(
      "Error: pixabay API connection failed, additional information:",
      error
    );
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

module.exports = { app, fetchGeoCoordinates };
