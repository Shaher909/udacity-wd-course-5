var path = require("path");
const express = require("express");

const app = express();

app.use(express.static("dist"));

console.log(__dirname);
