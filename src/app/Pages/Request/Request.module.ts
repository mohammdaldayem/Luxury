import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { IndexComponent } from './Index/Index.component';
import { RequestRoutes } from './Request.routing';
import { RequestService } from '../../Services/request.service';
import { SellerService } from '../../Services/Seller.service';
import { ItemService } from '../../Services/Item.service';
import { RequestViewComponent } from './requestView/requestView.component';
import { GridDeletbtnModule } from '../../shared/GridDeletbtn/GridDeletbtn.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RequestRoutes),
    FormsModule,
    MdModule,
    MaterialModule,
    GridDeletbtnModule
  ],
  declarations: [IndexComponent, RequestViewComponent],
  providers: [RequestService, SellerService, ItemService]
})
export class RequestModule { }
