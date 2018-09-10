import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './Index/Index.component';
import { SubcategoryViewComponent} from './View/SubcategoryView.component';

export const SubCategoryRoutes: Routes = [
  {
    path: '',
    children: [ {
        path: '',
        component: IndexComponent
    },
    {
        path: 'View',
        component: SubcategoryViewComponent
    }]
}
];

