// Client side validation to having a valid date
function dateInputValidation() {
  const dateInput = document.getElementById("departure-date");

  dateInput.addEventListener("change", () => {
    const selectedDate = new Date(dateInput.value);
    const today = new Date();

    if (selectedDate < today) {
      alert("Please select a future date.");
      dateInput.value = "";
    }
  });
}

dateInputValidation();

//Trip removal logic: remove trip from local storage and hide the trip div.
export function removeTrip() {
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
}
