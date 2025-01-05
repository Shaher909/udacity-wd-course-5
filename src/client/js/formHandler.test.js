import { renderInfoToHtml } from "./formHandler";

jest.mock("./app", () => ({
  removeTrip: jest.fn(),
}));

describe("renderInfoToHtml", () => {
  beforeEach(() => {
    // Set up a mock DOM structure
    document.body.innerHTML = `
      <img id="trip-destination-img" />
      <span id="trip-destination"></span>
      <span id="trip-countdown"></span>
      <span id="weather-info"></span>
    `;
  });

  it("should render trip information to the HTML elements", () => {
    // Mock trip data
    const tripInfo = {
      imageURL:
        "https://github.com/Shaher909/udacity-wd-course-5/tree/main/src/client/images/no-image.svg",
      city: "Paris",
      departureDate: "2025-01-15",
      daysCount: 10,
      weatherType: "forecast",
      weatherDescription: "clear skies",
      weatherTemp: "20",
      weatherLowTemp: "15",
      weatherHighTemp: "25",
    };

    // Call the function
    renderInfoToHtml(tripInfo);

    // Assertions
    expect(document.getElementById("trip-destination-img").src).toBe(
      tripInfo.imageURL
    );
    expect(document.getElementById("trip-destination").innerText).toBe(
      `My trip to Paris is on: 2025-01-15`
    );
    expect(document.getElementById("trip-countdown").innerText).toBe(
      `Paris trip is 10 days away`
    );
    expect(document.getElementById("weather-info").innerText).toBe(
      `The forecast weather is clear skies with a temperature of 20 (low: 15, high: 25)`
    );
  });
});
