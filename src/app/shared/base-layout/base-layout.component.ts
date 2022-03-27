/*
============================================
; Title: nodebucket Sprint1
; Author: Professor Krasso
; Date: March 26, 2022
; Modified By: William Talley
; Description: nodebucket base-layout component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}
