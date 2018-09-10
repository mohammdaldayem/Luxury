import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './Index/Index.component';
import { CategoryViewComponent} from './View/CategoryView.component';

export const CategoryRoutes: Routes = [
  {
    path: '',
    children: [ {
        path: '',
        component: IndexComponent
    },
    {
        path: 'View',
        component: CategoryViewComponent
    }]
}
];

