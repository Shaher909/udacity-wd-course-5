const { fetchGeoCoordinates } = require("./server");

describe("callGeoNamesApi", () => {
  try {
    it("will return geo codes of a specific city", async () => {
      const result = await fetchGeoCoordinates("FR", "paris");
      expect(result).toEqual({ longitude: "2.38332", latitude: "48.82725" });
    }, 10000);
  } catch (e) {
    console.error("Error fetching geo coordinates:", error);
    fail("The fetchGeoCoordinates function threw an error.");
  }
});
