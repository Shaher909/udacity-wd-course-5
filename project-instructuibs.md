# Project Instructions

## What are we building ?

The project will include a simple formw here you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast.

- Weatherbit API could be used to get data about future dates.

## Requirements:

- A form to obtain location and date from the user (in relation to the trip).
- Dsiplay the weather and image of the location using external APIs.
- Improve and optimzie the project as you see fit to make it as professional as it could be.

## Questions to think about:

The following are just some of the questions that you’ll experience along the way:

- What’s the ideal workflow?
- How many files do I need?
- How do I convert one project into another?
- Should I redo the HTML/CSS first or go straight to the javascript?
- How many JavaScript functions do I need?
- Should my function be this many lines of code?
- Is readability or performance more important?

## Development Strategy

#1 - Duplicate code from project #3 (as a starting point)
-- -- install express and cors - OK
#2 - Get webpack set up to work with this project
-- install webpack and its webpack-cli - OK
-- install babel, babael-preset, babel-loader - OK
-- Create babel config file - OK
-- Create .js loader - OK
-- Installed html-webpack-plugin - OK
-- Installed CSS load & extraction plugins - OK
-- Minifi css -
-- Service workers -
-- your stylesheets should be .scss files - OK
-- server should access `dist` directory - OK
-- index.js should import the main function, and import your scss files. - OK
#3 - Setup `package.json` file with the necessary scripts to test, dev, start and build. - OK
#4 - Create an account: https://www.geonames.org/export/web-services.html
#5 - Replace the openweather api with geonames api
#6 - Introduce a countdown.
-- What type of input should it be? What about cross browser rendering?
-- We’re looking to see how soon the trip is, how can you get the information from the DOM and see how soon that date is?
-- Where should you be storing that data once you have it?
#7 - Create an account: https://www.weatherbit.io/account/create
#8 - Integrate the Weatherbit API similarly to how you integrated the geoname api.
#8 - Create an account: https://pixabay.com/api/docs/
#9 - Integrate the Pixabay API similarly to how you integrated the Geoname/Weatherbit APIs. (Choose one of the items from the suggested list to add in. The items vary in complexity, but you must choose at least 1, all others are optional.)
#10 - Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
#11 - Allow the user to remove the trip.
##12 - Use Local Storage(opens in a new tab) to save the data so that when they close, then revisit the page, their information is still there.
#12 - Add in services workers. Refer to project 4 for guidance.

https://learn.udacity.com/nanodegrees/nd0011/parts/43c0edba-811f-4f64-86f8-9ba7a3f699c2/lessons/ls0431/concepts/5feb91b1-ada5-4727-80ed-3628111222ca?lesson_tab=lesson

## Project structure:

Root
├── package.json
├── readme.md
├── src
│ ├── client
│ │ ├── index.js
│ │ ├── js
│ │ │ └── app.js (name will vary)
│ │ ├── styles
│ │ │ └── style.scss (name will vary)
│ │ └── views
│ │ └── index.html
│ └── server
│ └── server.js (name will vary)
└── webpack.config.js
