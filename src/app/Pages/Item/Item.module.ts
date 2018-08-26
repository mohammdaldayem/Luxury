import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { ItemRoutes } from './Item.routing';
import { ItemService } from '../../Services/Item.service';
import { IndexComponent } from './Index/Index.component';
import { ItemViewComponent } from './ItemView/ItemView.component';
import { GridDeletbtnModule } from '../../shared/GridDeletbtn/GridDeletbtn.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ItemRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    GridDeletbtnModule
  ],
  declarations: [IndexComponent, ItemViewComponent],
  providers: [ItemService]
})
export class ItemModule { }
