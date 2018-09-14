import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthRoutes } from './Auth.routing';
import {LoginComponent} from './Login/Login.component';
import {UserService} from '../../app/Services/User.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent],
    providers: [UserService ,CookieService]
})
export class AuthModule { }
