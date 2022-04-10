/*
============================================
; Title: nodebucket Sprint3
; Author: Professor Krasso
; Date: April 10, 2022
; Modified By: William Talley
; Description: nodebucket employee.js
;===========================================
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemDocument = require('./item');

// Schema for employee documents

let employeeSchema = new Schema ({
    empId: { type: String, unique: true, dropDups: true },
    first_name: { type: String },
    last_name: { type: String },
    jobTitle: { type: String },
    toDo: [ItemDocument],
    done: [ItemDocument]
  }, { collection: 'employees'})

  module.exports = mongoose.model('Employee', employeeSchema);
