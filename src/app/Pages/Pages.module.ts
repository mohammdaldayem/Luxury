import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import {PagesRoutes} from './Pages.routing';
import { GridDeletbtnComponent } from '../shared/GridDeletbtn/GridDeletbtn.component';
import { SellerModule } from './Seller/Seller.module';
import { ItemModule } from './Item/Item.module';
import { FieldErrorDisplayComponent } from '../shared/field-error-display/field-error-display.component';
import { GridDeletbtnModule } from '../shared/GridDeletbtn/GridDeletbtn.module';
import {SubCategoryModule} from './SubCategory/SubCategory.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    MdModule,
    MaterialModule,
    SellerModule,
    ItemModule,
    GridDeletbtnModule,
    SubCategoryModule
  ],
  declarations: []
})
export class PagesModule { }
