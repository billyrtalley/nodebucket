/*
============================================
; Title: nodebucket Sprint2
; Author: Professor Krasso
; Date: March 29, 2022
; Modified By: William Talley
; Description: nodebucket tasks.js
;
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: {type: String}
});

module.exports = itemSchema;
