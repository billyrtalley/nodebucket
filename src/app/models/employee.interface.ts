/*
============================================
; Title: nodebucket Sprint2
; Author: Professor Krasso
; Date: March 30, 2022
; Modified By: William Talley
; Description: nodebucket employee.interface
;===========================================
*/

import { Item } from './item.interface';

export interface Employee {
  empId: string;
  toDo: Item[];
  done: Item[];
}
