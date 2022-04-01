/*
============================================
; Title: nodebucket Sprint2
; Author: Professor Krasso
; Date: March 30, 2022
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
//employee model from the models folder
const Employee = require("./models/employee");
// const employee = require("./models/employee");



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

/**
 * API(s) go here...
 * findEmployeeById
 */
app.get("/api/employees/:empId", async (req, res) => {
  console.log('the findEmployeeById API is working');
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Internal server error",
        });
      } else {
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'message': "Internal server error."
    });
  }
});

// findAllTasks
app.get('/api/employees/:empId/tasks', async(req, res) => {
  console.log('the findAllTasks API is working');
  try{
    Employee.findOne({'empId': req.params.empId}, 'empId toDo.taskName done.taskName', function(err, employee) {
      if(err) {
        console.log(err);
        res.status(501).send({
          'message': "Internal server error."
        })
      } else {
        console.log(employee);
        res.json(employee);
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'message': "Internal server error."
    })
  }
})

// create Task

// app.post('/api/employees/:empId/task', async(req, res)=> {
//   console.log('the createTask API is working');
//   try {
//     const newItem = {

//       taskName: req.body.taskName,
//       dueDate: req.body.dueDate,
//       priority: req.body.priority,
//       status: req.body.status
//     }
//      Employee.findOne({_id: req.params.empId}, function(err, item) {
//       if(err) {
//         res.status(501).send({
//           'message': "Internal server error."
//         })
//       } else {
//         console.log(item);
//         item.task.push(newItem);
//         Employee.update(item);
//       }
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({
//       'message': "Internal server error."
//     })
//   }
// })

/**
 * Create and start server
 */
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
