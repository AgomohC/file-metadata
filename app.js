// require express
const express = require("express");

//initialize dotenv
require("dotenv").config();

//initialize multer
const multer = require("multer");

//connection function
const connectDB = require("./db/connect");

//initialize express
const app = express();

// middleware //
//static files
app.use(express.static("./public"));

//parser
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
