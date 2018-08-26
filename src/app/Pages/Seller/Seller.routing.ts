import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './Index/Index.component';
import { SellerViewComponent } from './SellerView/SellerView.component';

export const SellerRoutes: Routes = [
  {
    path: '',
    children: [ {
        path: '',
        component: IndexComponent
    },
    {
        path: 'View',
        component: SellerViewComponent
    }]
}
];

