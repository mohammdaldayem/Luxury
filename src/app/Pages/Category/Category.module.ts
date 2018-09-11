import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { IndexComponent } from './Index/Index.component';
import { CategoryRoutes } from './Category.routing';
import { CategoryService } from '../../Services/CategoryService.service';
import { GridDeletbtnModule } from '../../shared/GridDeletbtn/GridDeletbtn.module';
import {CategoryViewComponent} from './View/CategoryView.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CategoryRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    GridDeletbtnModule
  ],
  declarations: [IndexComponent, CategoryViewComponent],
  providers: [CategoryService]
})
export class CategoryModule { }
