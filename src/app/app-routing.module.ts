/*
============================================
; Title: nodebucket Sprint2
; Author: Professor Krasso
; Date: April 3, 2022
; Modified By: William Talley
; Description: nodebucket app-routing module
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
import { AboutComponent } from './pages/about/about.component';


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
      },
      {
        path: 'about',
        component: AboutComponent,
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
