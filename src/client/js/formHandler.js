import { removeTrip } from "./app";

// function to handle the form submission and call the post request
export function handleSubmit() {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    clearValidationErrors();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    postData("/submit", {
      city: data["city"],
      departureDate: data["departure-date"],
      country: data["country"],
    });
  });
}

// Async function to post the data to the server from the client side
const postData = async (url, dataRecord) => {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataRecord),
  });

  try {
    const newData = await request.json();
    if (newData.faultyEntry) {
      displayNoResultsValidation();
      return;
    }

    showTripResultDiv();
    renderInfoToHtml(newData); //render the response data to HTML elements
    localStorage.setItem("tripInfo", JSON.stringify(newData)); //store the data in browser's local storage for further handling (better UX and display of info on next page)
  } catch (error) {
    console.log("Error", error);
  }
};

function displayNoResultsValidation() {
  const errorSpan = document.getElementById("validation-error");
  errorSpan.innerText =
    "There was no valid results, please check your city and country input. If they are valid there could be a system interruption at the moment";
}

function clearValidationErrors() {
  const errorSpan = document.getElementById("validation-error");
  errorSpan.innerText = "";
}

function renderInfoToHtml(tripInfo) {
  //# trip-destination -> My trip to: x, y departing on 9999/1/1
  const tripDestinationSpan = document.getElementById("trip-destination");
  tripDestinationSpan.innerText = `My trip to ${tripInfo.city} is on: ${tripInfo.departureDate}`;

  //# trip-countdown -> x,y is 999 days away
  const tripRemainingDays = document.getElementById("trip-countdown");
  tripRemainingDays.innerText = `${tripInfo.city} trip is ${tripInfo.daysCount} days away`;

  //# weather-info -> The weather is: bla blah, tempretature: 2
  const tripWeather = document.getElementById("weather-info");
  let weatherText = `The ${tripInfo.weatherType} weather is ${tripInfo.weatherDescription} with a temperature of ${tripInfo.weatherTemp}`;
  if (tripInfo.weatherLowTemp && tripInfo.weatherHighTemp) {
    weatherText += ` (low: ${tripInfo.weatherLowTemp}, high: ${tripInfo.weatherHighTemp})`;
  }

  tripWeather.innerText = weatherText;
}

// Display the trip result div
function showTripResultDiv() {
  const tripResultDiv = document.getElementById("trip-info");
  tripResultDiv.classList.remove("hidden");

  //Include the remove button function into the button inside the trip result div
  const removeTripBtn = document.getElementById("remove-trip");
  removeTripBtn.addEventListener("click", removeTrip);

  //Hide the trip form div
  const tripFormDiv = document.getElementById("trip-form");
  tripFormDiv.classList.add("hidden");
}
