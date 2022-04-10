/*
============================================
; Title: nodebucket Sprint3
; Author: Professor Krasso
; Date: April 10, 2022
; Modified By: William Talley
; Description: nodebucket task.service file
;===========================================
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  findAllTasks(empId: number): Observable<any> {
    console.log('work damnit!');
    return this.http.get('/api/employees/' + empId + '/tasks');

  }

  createTask(empId: number, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      taskName: task
    })
  }

  updateTask(empId: number, toDo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      toDo,
      done
    })
  }

  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
  }



}
