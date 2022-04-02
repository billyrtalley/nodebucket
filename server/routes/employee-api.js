/*
============================================
; Title: nodebucket Sprint2
; Author: Professor Krasso
; Date: April 1, 2022
; Modified By: William Talley
; Description: nodebucket employee api file
;===========================================
*/

const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();

/**
 * API(s) go here...separated the apis from the app.js file to clean up the files
 * findEmployeeById
 */
 router.get("/:empId", async (req, res) => {
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
router.get('/:empId/tasks', async(req, res) => {
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

router.post('/api/employees/:empId/tasks', async(req, res) => {
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee){
      if (err)
      {
        console.log(err);
        res.status(500).send({
          'message': 'Internal server error: ' + err.message
        })
      } else
      {
        console.log(employee);

        const newItem = {
          text: req.body.text
        }
        employee.todo.push(newItem);

        employee.save(function(err, updatedEmployee) {
          if (err)
          {
            console.log(err);
            res.status(500).server({
              'message': 'Internal server error: ' + err.message
            })
          }
          else
          {
            console.log(updatedEmployee);
            res.json(updatedEmployee);
          }
        })
      }
    })
  }
  catch(e)
  {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error: ' + e.message
    })
  }
})

module.exports = router;
