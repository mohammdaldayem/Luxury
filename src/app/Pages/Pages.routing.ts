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
<<<<<<< HEAD
    path: 'SubCategory',
    loadChildren: './SubCategory/SubCategory.module#SubCategoryModule'
  },
  {
    path: 'Category',
    loadChildren: './Category/Category.module#CategoryModule'
=======
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
>>>>>>> 32af0dd976d0dc3dcb1a0d9f7ab956d61a4c9ecc
  }]
}
];
