import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { GridDeletbtnModule } from '../../shared/GridDeletbtn/GridDeletbtn.module';
import { IndexComponent } from './Index/Index.component';
import { AreaViewComponent } from './AreaView/AreaView.component';
import { AreaRoutes } from './Area.routing';
import { AreaService } from '../../Services/Area.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AreaRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    GridDeletbtnModule
  ],
  declarations: [IndexComponent, AreaViewComponent],
  providers: [AreaService]
})
export class AreaModule { }
