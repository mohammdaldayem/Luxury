import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './Index/Index.component';
import { ItemViewComponent } from './ItemView/ItemView.component';

export const ItemRoutes: Routes = [
  {
    path: '',
    children: [ {
        path: '',
        component: IndexComponent
    },
    {
        path: 'View',
        component: ItemViewComponent
    }]
}
];

