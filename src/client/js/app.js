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
