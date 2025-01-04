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
  alert("button clicked");
  localStorage.removeItem("tripInfo");
  const tripResultDiv = document.getElementById("trip-info");
  tripResultDiv.classList.add("hidden");
}
