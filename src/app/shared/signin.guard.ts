/*
============================================
; Title: nodebucket Sprint2
; Author: Professor Krasso
; Date: March 30, 2022
; Modified By: William Talley
; Description: nodebucket signin.guard component file
;===========================================
*/

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class SigninGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const sessionUser = this.cookieService.get('session_user');

      if (sessionUser) {
        return true;
      } else {
        this.router.navigate(['/session/signin']);
        return false;
      }
    }
  }
