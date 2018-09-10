import { Routes, RouterModule } from '@angular/router';


export const PagesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'Request',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [ {
        path: 'Request',
        loadChildren: './Request/Request.module#RequestModule'
    },
  {
    path: 'Seller',
    loadChildren: './Seller/Seller.module#SellerModule'
  },
  {
    path: 'Item',
    loadChildren: './Item/Item.module#ItemModule'
  },
  {
    path: 'Area',
    loadChildren: './Area/Area.module#AreaModule'
  },
  {
    path: 'Terms',
    loadChildren: './TermsAndConditions/TermsAndConditions.module#TermsAndConditionsModule'
  },
  {
    path: 'Advertisment',
    loadChildren: './Advertisment/Advertisment.module#AdvertismentModule'
  },
  {
    path: 'ContactUs',
    loadChildren: './ContactUs/ContactUs.module#ContactUsModule'
  }]
}
];
