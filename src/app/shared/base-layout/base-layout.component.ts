/*
============================================
; Title: nodebucket Sprint3
; Author: Professor Krasso
; Date: April 10, 2022
; Modified By: William Talley
; Description: nodebucket base-layout component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  isLoggedIn: boolean
  name: string;

  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;
    console.log('isLoggedIn: ' + this.isLoggedIn);
  }

  ngOnInit(): void {
    console.log('inside the ngOnInit of the base-layout.component.html file');
    this.name = sessionStorage.getItem('name');
    console.log('Logged in user name ' + this.name);
  }

  signOut(){

    this.router.navigateByUrl('/session/signin');
    this.cookieService.deleteAll();
  }

}
