## API connections

- GeoNames API: for location info
  -- Input: city
  -- Output: latitude, longitude and country
  Docu: https://www.geonames.org/maps/addresses.html#geoCodeAddress
  Example: http://api.geonames.org/geoCodeAddressJSON?q=Museumplein+6+amsterdam&username=demo

- Weatherbit API: for weather info
  -- Input: Latitude/longitude
  -- Output:
  --- Current: https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely
  --- Forecast: https://api.weatherbit.io/v2.0/forecast/daily?lat=35.7796&lon=-78.6382&&key=API_KEY

- Pixabay API: for images
  -- Input: q (search term), image_type
  -- Output:
  Docu: https://pixabay.com/api/docs/
  Example: https://pixabay.com/api/?key=47992973-c3889de341fa774b7d6882113&q=yellow+flowers&image_type=photo

## Architecture & decisions

- Upon form submission redirection happens for a better performance and form details are attached as params for the next page to handle.
