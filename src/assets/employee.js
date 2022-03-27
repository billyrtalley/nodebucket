
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let toDoSchema = new Schema ({
    taskNumber: { type: String },
    taskName: { type : String },
    dueDate: { type: String },
    priority: { type: String },
    status: { type: String }
});

let doneSchema = new Schema ({
    taskNumber: { type: String },
    taskName: { type : String },
    dueDate: { type: String },
    priority: { type: String },
    status: { type: String }
});

let employeeSchema = new Schema ({
    empId: { type: String, unique: true, dropDups: true },
    firstName: { type: String },
    lastName: { type: String },
    jobTitle: { type: String },
    toDo: [toDoSchema],
    done: [doneSchema]
  }, { collection: 'employees'})

  module.exports = mongoose.model('Employee', employeeSchema);
