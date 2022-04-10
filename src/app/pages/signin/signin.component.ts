/*
============================================
; Title: nodebucket Sprint3
; Author: Professor Krasso
; Date: April 10, 2022
; Modified By: William Talley
; Description: nodebucket sign-in component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  error: string;


  constructor(private router: Router, private cookieService: CookieService,
    private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  login() {
    const empId = this.form.controls['empId'].value;

    this.http.get('/api/employees/' + empId).subscribe((res) =>
      {
        if(res)
        {
          console.log(empId);
          this.router.navigate(['../home']);
          sessionStorage.setItem('name', `${res['first_name']} ${res['last_name']}`)
          this.cookieService.set('session_user', empId, 1);

        }
        else
        {
          this.error = 'Invalid employee ID. Please try again';
        }
      })
    }
  }
