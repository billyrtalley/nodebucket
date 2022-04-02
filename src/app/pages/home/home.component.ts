/*
============================================
; Title: nodebucket Sprint2
; Author: Professor Krasso
; Date: March 30, 2022
; Modified By: William Talley
; Description: nodebucket home.component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.interface';
import { Item } from '../../models/item.interface';
import { TaskService } from 'src/app/services/task.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee: Employee;
  toDo: Item[];
  done: Item[];
  empId: number;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('Response from findAllTasks');
      console.log(res);

      this.employee = res;
      console.log('Employee object');
      console.log(this.employee);
    }, err => {
      console.log('server error');
      console.log(err);
    }, () => {
      console.log('findAllTasks API');

      this.toDo = this.employee.toDo;
      this.done = this.employee.done;

      console.log('toDo tasks');
      console.log(this.toDo);

      console.log('done tasks');
      console.log(this.done);
        })
   }

  ngOnInit(): void {
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res;
        }, err => {
          console.log('server error');
          console.log(err);
        }, () => {
          this.toDo = this.employee.toDo;
          this.done = this.employee.done;
        })
      }
    })
  }
}
