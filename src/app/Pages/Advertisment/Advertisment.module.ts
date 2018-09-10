import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertismentViewComponent } from './AdvertismentView/AdvertismentView.component';
import { IndexComponent } from './Index/Index.component';
import { RouterModule } from '@angular/router';
import { AdvertismentRoutes } from './Advertisment.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { GridDeletbtnModule } from '../../shared/GridDeletbtn/GridDeletbtn.module';
import { AdvertismentService } from '../../Services/Advertisment.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdvertismentRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    GridDeletbtnModule
  ],
  declarations: [IndexComponent, AdvertismentViewComponent],
  providers: [AdvertismentService]
})
export class AdvertismentModule { }
