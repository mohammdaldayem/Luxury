import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { IndexComponent } from './Index/Index.component';
import { SubCategoryRoutes } from './SubCategory.routing';
import { SubCategoryService } from '../../Services/SubCategory.service';
import { CategoryService } from '../../Services/CategoryService.service';
import { GridDeletbtnModule } from '../../shared/GridDeletbtn/GridDeletbtn.module';
import {SubcategoryViewComponent} from './View/SubcategoryView.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SubCategoryRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    GridDeletbtnModule
  ],
  declarations: [IndexComponent,SubcategoryViewComponent],
  providers: [ SubCategoryService,CategoryService]
})
export class SubCategoryModule { }
