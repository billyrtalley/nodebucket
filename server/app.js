/*
============================================
; Title: nodebucket Sprint3
; Author: Professor Krasso
; Date: April 10, 2022
; Modified By: William Talley
; Description: nodebucket app.js component file
;===========================================
*/
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
// Added after relocating the APIs to the employees-api.js file
const EmployeeAPI = require('./routes/employee-api');





/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

/**
 * Variables
 */
const port = process.env.PORT || 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn =
  "mongodb+srv://billyrtalley:WEB450@buwebdev-cluster-1.wmilj.mongodb.net/nodebucket?retryWrites=true&w=majority";

/**
 * Database connection
 */
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.debug(`Connection to the database instance was successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  }); // end mongoose connection

  // APIs location
  app.use('/api/employees', EmployeeAPI);

/**
 * Create and start server
 */
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
