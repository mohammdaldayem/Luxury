import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'Auth',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'Auth',
      loadChildren: './Auth/Auth.module#AuthModule'
    }]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'Pages',
    loadChildren: './Pages/Pages.module#PagesModule'
  }
]}
];

