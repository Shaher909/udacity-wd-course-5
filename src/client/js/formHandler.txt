import { writeInfoToLocalStorage } from "./formHandler";

describe("Test data writing to local storage", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
    jest.spyOn(localStorage, "setItem");
    jest.spyOn(localStorage, "getItem");
  });

  try {
    it("will test if the returned info is written to the browser's local storage", () => {
      const key = "tripInfo";
      const dataObject = {
        city: "paris",
        weatherType: "forecast",
      };

      writeInfoToLocalStorage(dataObject);

      // Check if localStorage.setItem was called with correct arguments
      expect(localStorage.setItem).toHaveBeenCalledWith(
        key,
        JSON.stringify(dataObject)
      );

      const result = JSON.parse(localStorage.getItem(key));

      // Verify that localStorage.getItem was called with the correct key
      expect(result).toEqual(dataObject);
    });
  } catch (e) {
    console.error("Error ", error);
    fail("Error.");
  }
});

// it("will test if the returned info is written to the browser's local storage", () => {
//     const dataObject = {
//       city: "paris",
//       weatherType: "forecast",
//     };

//     writeInfoToLocalStorage(dataObject);
//     // Verify that localStorage.setItem was called with the correct arguments
//     expect(localStorage.setItem).toHaveBeenCalledWith(
//       "tripInfo",
//       JSON.stringify(dataObject)
//     );

//     // Check if the item is actually in localStorage
//     const storedValue = localStorage.getItem("tripInfo");
//     expect(storedValue).toBe(JSON.stringify(dataObject));
//   });
