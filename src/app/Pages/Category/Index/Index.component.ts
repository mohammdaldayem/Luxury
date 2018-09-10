import { Component, OnInit } from '@angular/core';
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
  dataSource: MatTableDataSource<ICategory>;
  imagePath: string = AppConfig.settings.apiServer.categoryimagepath;
  categories: ICategory[];
  constructor(private CategoryService: CategoryService) { }
  ngOnInit() {
    this.CategoryService.getCategories().subscribe(result => {
      this.dataSource = new MatTableDataSource<ICategory>((<IResponse>result).Categories);
    })
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteCategory(ID: Number) {
    this.CategoryService.deleteCategory({ CategoryId: ID }).subscribe(result => {
      const response = <IResponse>result;
      if (response.success === true) {
        swal({
          title: 'Success',
          text: 'The transaction is succeeded',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
        }).catch(swal.noop);
        this.CategoryService.getCategories().subscribe(result => {
          this.dataSource = new MatTableDataSource<ICategory>((<IResponse>result).Categories);
        })
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
