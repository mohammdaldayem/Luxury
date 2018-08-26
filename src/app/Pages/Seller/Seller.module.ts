import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { IndexComponent } from './Index/Index.component';
import { SellerViewComponent } from './SellerView/SellerView.component';
import { SellerRoutes } from './Seller.routing';
import { SellerService } from '../../Services/Seller.service';
import { GridDeletbtnModule } from '../../shared/GridDeletbtn/GridDeletbtn.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SellerRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    GridDeletbtnModule
  ],
  declarations: [IndexComponent, SellerViewComponent],
  providers: [ SellerService]
})
export class SellerModule { }
