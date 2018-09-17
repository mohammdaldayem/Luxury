import { Routes, RouterModule } from '@angular/router';
import { Addomponent } from './Add/Add.component';

export const DeliveryRoutes: Routes = [
  {
    path: '',
    children: [ {
        path: '',
        component: Addomponent
    }]
}
];
