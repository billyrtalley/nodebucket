/*
============================================
; Title: nodebucket Sprint3
; Author: Professor Krasso
; Date: April 10, 2022
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
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  employee: Employee;
  toDo: Item[];
  done: Item[];
  empId: number;



  // using findAllTasks to display the employee's to do and done tasks

  constructor(
    private taskService: TaskService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    this.taskService.findAllTasks(this.empId).subscribe(
      (res) => {
        // console.log('Response from findAllTasks');
        // console.log(res);

        this.employee = res;
        // console.log('Employee object');
        // console.log(this.employee);
      },
      (err) => {
        // console.log('server error');
        // console.log(err);
      },
      () => {
        // console.log('findAllTasks API');

        this.toDo = this.employee.toDo;
        this.done = this.employee.done;

        // console.log('toDo tasks');
        // console.log(this.toDo);

        // console.log('done tasks');
        // console.log(this.done);
      }
    );
  }

  ngOnInit(): void {}

  // create a new task via dialog and pairs the new task to the employee

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(
          (res) => {
            this.employee = res;
          },
          (err) => {
            console.log('server error');
            console.log(err);
          },
          () => {
            this.toDo = this.employee.toDo;
            this.done = this.employee.done;

          }
        );
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log('existing task list reordered');

      this.updateTaskList(this.empId, this.toDo, this.done);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log('moved task to the container');

      this.updateTaskList(this.empId, this.toDo, this.done);
    }
  }

  updateTaskList(empId: number, toDo: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, toDo, done).subscribe(
      (res) => {
        this.employee = res.data;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.toDo = this.employee.toDo;
        this.done = this.employee.done;
      }
    );
  }

  deleteTask(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      if(taskId) {
        console.log(`Task item: ${taskId} was deleted`);
        this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.toDo = this.employee.toDo;
          this.done = this.employee.done;
        })
      }
    }
  }
}
