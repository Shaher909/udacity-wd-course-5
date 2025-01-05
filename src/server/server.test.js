const { fetchGeoCoordinates } = require("./server");

// coordinate for Paris, FR are: longitude: "2.38332", latitude: "48.82725"

describe("GeoNames API Integration", () => {
  test("should return exact geo coordinates for a valid city and country", async () => {
    const country = "FR"; // Example country code for France
    const city = "Paris";
    const expectedCoordinates = { longitude: "2.38332", latitude: "48.82725" };

    const result = await fetchGeoCoordinates(country, city);

    expect(result).toEqual(expectedCoordinates); // Let Jest handle assertion failures.
  });
});
