/*
============================================
; Title: nodebucket Sprint3
; Author: Professor Krasso
; Date: April 10, 2022
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
