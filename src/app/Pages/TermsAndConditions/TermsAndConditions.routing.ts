import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './Index/Index.component';

export const TermsAndConditionsRoutes: Routes = [
  {
    path: '',
    children: [ {
        path: '',
        component: IndexComponent
    }]
}
];
