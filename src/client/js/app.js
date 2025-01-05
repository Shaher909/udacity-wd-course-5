import { renderInfoToHtml, showTripResultDiv } from "./formHandler";

//Client side validation to having a valid date
const dateInputValidation = () => {
  const dateInput = document.getElementById("departure-date");

  dateInput.addEventListener("change", () => {
    const selectedDate = new Date(dateInput.value);
    const today = new Date();

    if (selectedDate < today) {
      alert("Please select a future date.");
      dateInput.value = "";
    }
  });
};

dateInputValidation();

//Trip removal logic: remove trip from local storage and hide the trip div.
export const removeTrip = () => {
  localStorage.removeItem("tripInfo");

  //Clear spans content from previous trip details
  const tripDestinationSpan = document.getElementById("trip-destination");
  tripDestinationSpan.innerText = "";

  const tripCountDownSpan = document.getElementById("trip-countdown");
  tripCountDownSpan.innerText = "";

  const tripWeatherInfo = document.getElementById("weather-info");
  tripWeatherInfo.innerText = "";

  //Hide the whole div
  const tripResultDiv = document.getElementById("trip-info");
  tripResultDiv.classList.add("hidden");

  //Show the trip form div
  const tripFormDiv = document.getElementById("trip-form");
  tripFormDiv.classList.remove("hidden");
};

const loadDataFromStorageForReturningCustomers = () => {
  const storedTripInfo = localStorage.getItem("tripInfo");
  // Check if tripInfo exists in local storage
  if (storedTripInfo) {
    const tripInfo = JSON.parse(storedTripInfo); // Parse the JSON string
    renderInfoToHtml(tripInfo);
    showTripResultDiv(); // Show the trip info and hide the form
  }
};

loadDataFromStorageForReturningCustomers();
