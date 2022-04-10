/*
============================================
; Title: nodebucket Sprint3
; Author: Professor Krasso
; Date: April 10, 2022
; Modified By: William Talley
; Description: nodebucket create task dialog component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.taskForm = this.fb.group({
//text name has to match the matInput formControlName from the create task html
      text: [null, Validators.compose([Validators.required])]
    })
  }

  createTask() {

//taskform is from the formGroup name on the html
    this.dialogRef.close(this.taskForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

}
