import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { AuthRoutes } from './Auth.routing';
import {LoginComponent} from './Login/Login.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    FormsModule,
    MdModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent]
})
export class AuthModule { }
