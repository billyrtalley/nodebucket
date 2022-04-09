/*
============================================
; Title: nodebucket Sprint3
; Author: Professor Krasso
; Date: April 9, 2022
; Modified By: William Talley
; Description: nodebucket employee api file
;===========================================
*/

const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();
const BaseResponse = require('../models/base-response')

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

router.post('/:empId/tasks', async(req, res) => {
  try
  {
    Employee.findOne({empId: req.params.empId}, function(err, employee) {
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
          taskName: req.body.taskName
        }

        console.log(newItem)
        employee.toDo.push(newItem);

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

//deleteTask

router.delete('/:empId/tasks/:taskId', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {

      if(err) {
        console.log(err);
        const deleteTaskMongoResponse = new BaseResponse('501', 'MongoDB Server Error', err);
        res.status(501).send(deleteTaskMongoResponse.toObjects());
      } else {
        console.log(employee);
        const toDoItem = employee.toDo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

        if (toDoItem) {
          employee.toDo.id(toDoItem._id).remove();
          employee.save(function(err, updatedToDoItemEmployee) {
            if (err) {
              console.log(err);
              const deleteToDoItemMongoErrorResponse = new BaseResponse('501', 'MongoDB Server Error', err);
              res.status(501).send(deleteToDoItemMongoErrorResponse.toObject());
            } else {
              console.log(updatedToDoItemEmployee);
              const deleteToDoItemSuccessResponse = new BaseResponse('200', 'To do task removed', updatedToDoItemEmployee);
              res.json(deleteToDoItemSuccessResponse.toObject());
            }
          })
        } else if (doneItem) {
          employee.done.id(doneItem._id).remove();
          employee.save(function(err, updatedDoneItemEmployee) {
            if (err) {
              console.log(err);
              const DoneItemMongoErrorResponse = new BaseResponse('501', 'MongoDB Server Error', err);
              res.status(501).send(deleteDoneItemMongoErrorResponse.toObject());
            } else {
              console.log(updatedDoneItemEmployee);
              const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Done task removed', updatedDoneItemEmployee);

              res.json(deleteDoneItemSuccessResponse.toObject());
            }
          })
        } else {
          console.log('Invalid Task ID: ' + req.params.taskId);
          const deleteTaskNotFoundResponse = new BaseResponse('300', 'Invalid Task ID', req.params.taskId);
          res.status(300).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    })
  } catch (e) {
    console.log(e);
    const deleteTaskCatchErrResponse = new BaseResponse('500', 'Internal Server Error', e);
    res.status(500).send(deleteTaskCatchErrResponse.toObject());
  }
});

// updateTask API

router.put("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        const updateTaskMongoErrorResponse = new BaseResponse('501', 'MongoDB Server Error', err);
        res.status(501).send(updateTaskErrorResponse.toObject());
      } else {
        console.log(employee);
        employee.set({
          toDo: req.body.toDo,
          done: req.body.done
        });
        employee.save(function(err, updatedEmployee) {
          if (err) {
            console.log(err);
            const updateTaskOnSaveErrorResponse = new BaseResponse('500', 'MongoDB Server Error', err);
            res.status(500).send(updateTaskOnSaveErrorResponse.toObject());
          } else {
            console.log(updatedEmployee);
            const updatedTaskOnSuccessResponse = new BaseResponse('200', 'Task updated', updatedEmployee);
            res.json(updatedTaskOnSuccessResponse.toObject());
          }
        })
      }
    })
  } catch(e) {
    console.log(e);
    const updateTaskCatchErrorResponse = new BaseResponse('500', 'Internal', e);
    res.status(500).send(updateTaskCatchErrorResponse.toObject());
  }
});


module.exports = router;
