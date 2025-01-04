## API connections

- GeoNames API: for location info
  [GeoNames Docu](https://www.geonames.org/maps/addresses.html#geoCodeAddress)
  [GeoNames Example](http://api.geonames.org/geoCodeAddressJSON?q=paris&countryCode=FR&username=demo)

- Weatherbit API: for weather info
  [Weatherbit Current](https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely)
  [Weatherbit Forecast](https://api.weatherbit.io/v2.0/forecast/daily?lat=35.7796&lon=-78.6382&&key=API_KEY)

- Pixabay API: for images
  Docu: [Pixabay Docu](https://pixabay.com/api/docs/)
  Example: [Pixabay Example](https://pixabay.com/api/?key=47992973-c3889de341fa774b7d6882113&q=yellow+flowers&image_type=photo)

## Architecture & decisions

- For better accuarcy and to avoid default behavior which may select unwanted country, a country selector is introduced, as some city names may exist in different countries.
- The application support specific countries only, this is due to the limitation of the geoNames API, only supported countries are listed in the drop down option.

## Test data

- Paris, FR: lat -> 48.82725, long -> 2.38332
