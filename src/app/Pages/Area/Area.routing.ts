import { Routes, RouterModule } from '@angular/router';
import { AreaViewComponent } from './AreaView/AreaView.component';
import { IndexComponent } from './Index/Index.component';

export const AreaRoutes: Routes = [
  {
    path: '',
    children: [ {
        path: '',
        component: IndexComponent
    },
    {
        path: 'View',
        component: AreaViewComponent
    }]
}
];
