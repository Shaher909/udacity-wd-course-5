// Setup empty JS object to act as endpoint for all routes
projectData = {};

// APIs credentials and endpoints
const geoNamesApiBaseURL = "http://api.geonames.org/geoCodeAddressJSON?";
const geoNamesApiUsername = "shaher909";

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
  res.send(projectData);
});

const fetchGeoCoordinates = async (country, city, url) => {
  const request = await fetch(
    `${url}q=${city}&countryCode=${country}&username=${geoNamesApiUsername}`
  );

  try {
    const data = await request.json();
    return data;
  } catch (error) {
    console.log("Error: API connection failed, additional information:", error);
  }
};
