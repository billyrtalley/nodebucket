/*
============================================
; Title: Exercise 9.3 Form Validation
; Author: Professor Krasso
; Date: March 2, 2022
; Modified By: William Talley
; Description: Bob's Computer Repair Shop App app routing module
;
;===========================================
*/

import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninGuard } from './shared/signin.guard';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactComponent } from './pages/contact/contact.component';


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [SigninGuard]
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [SigninGuard]
      },
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [SigninGuard]
      }
    ]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      // {
      //   path: 'not-found',
      //   component: NotFoundComponent
      // },
      {
        path: 'signin',
        component: SigninComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
