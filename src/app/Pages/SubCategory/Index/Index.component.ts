import { Component, OnInit } from '@angular/core';
import { SubCategoryService } from '../../../Services/SubCategory.service';
import { IResponse, ISubCategory, ICategory } from '../../../models/Response';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppConfig } from '../../../app.config';
import { CategoryService } from '../../../Services/CategoryService.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})

export class IndexComponent implements OnInit {

  displayedColumns: string[] = ['Image', 'Name', 'Actions'];
  dataSource: MatTableDataSource<ISubCategory>;
  imagePath: string = AppConfig.settings.apiServer.subCategoryimagepath;
  categories: ICategory[];
  category: string;
  constructor(private CategoryService: CategoryService, private SubCategoryService: SubCategoryService) { }
  ngOnInit() {
    this.CategoryService.getCategories().subscribe(result => {
      this.categories = ((<IResponse>result).Categories);
    })
    this.SubCategoryService.getSupCategories({ MainCategoryId: 3 }).subscribe(result => {
      this.dataSource = new MatTableDataSource<ISubCategory>((<IResponse>result).SubCategories);
    });
  }

  changeCategory() {
    this.SubCategoryService.getSupCategories({ MainCategoryId: this.category }).subscribe(result => {
      this.dataSource = new MatTableDataSource<ISubCategory>((<IResponse>result).SubCategories);
    });

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteSubcategory(ID: Number) {
    this.SubCategoryService.deleteSupCategory({ SubCategoryId: ID }).subscribe(result => {
      const response = <IResponse>result;
      if (response.success === true) {
        swal({
          title: 'Success',
          text: 'The transaction is succeeded',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
        }).catch(swal.noop);
        this.SubCategoryService.getSupCategories({ MainCategoryId: 3 }).subscribe(resultobj => {
          this.dataSource = new MatTableDataSource<ISubCategory>((<IResponse>resultobj).SubCategories);
        });
      } else {
        swal({
          title: 'Failed',
          text: 'The transaction is failed',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        }).catch(swal.noop);
      }
    });
  }

}
