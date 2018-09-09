import { Routes, RouterModule } from '@angular/router';
import { AdvertismentViewComponent } from './AdvertismentView/AdvertismentView.component';
import { IndexComponent } from './Index/Index.component';

export const AdvertismentRoutes: Routes = [
  {
    path: '',
    children: [ {
        path: '',
        component: IndexComponent
    },
    {
        path: 'View',
        component: AdvertismentViewComponent
    }]
}
];
