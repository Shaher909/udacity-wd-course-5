document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  });

  const queryString = new URLSearchParams(data).toString();
  const url = `/result.html?${queryString}`;

  // Redirect the user to the result page
  window.location.href = url;
});
