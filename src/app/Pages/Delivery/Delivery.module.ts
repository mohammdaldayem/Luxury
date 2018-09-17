import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { GridDeletbtnModule } from '../../shared/GridDeletbtn/GridDeletbtn.module';
import { DeliveryRoutes } from './Delivery.routing';
import { Addomponent} from './Add/Add.component';
import {DeliveryService} from '../../Services/Delivery.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DeliveryRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    GridDeletbtnModule
  ],
  declarations: [Addomponent],
  providers: [DeliveryService]
})
export class DeliveryModule { }
