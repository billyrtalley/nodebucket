/*
============================================
; Title: nodebucket Sprint3
; Author: Professor Krasso
; Date: April 10, 2022
; Modified By: William Talley
; Description: nodebucket tasks.js
;
;===========================================
*/


const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let itemSchema = new Schema({
  taskName: {type: String}
});

module.exports = itemSchema;
