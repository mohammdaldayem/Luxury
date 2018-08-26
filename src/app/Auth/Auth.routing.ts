import { Routes } from '@angular/router';
import {LoginComponent} from './Login/Login.component';
export const AuthRoutes: Routes = [
  {
    path: '',
    children: [ {
      path: '',
      component: LoginComponent
  }]
},
];

