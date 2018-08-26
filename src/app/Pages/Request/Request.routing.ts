import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './Index/Index.component';
import { RequestViewComponent } from './requestView/requestView.component';

export const RequestRoutes: Routes = [
  {
    path: '',
    children: [ {
        path: '',
        component: IndexComponent
    },
    {
        path: 'View',
        component: RequestViewComponent
    }]
}
];
