// function to handle the form submission and call the post request
export function handleSubmit() {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

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

  //window.location.href = "/test";
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
    console.log("post request is successful");
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("Error", error);
  }
};
