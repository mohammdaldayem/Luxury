import { Component, OnInit, ViewChild } from '@angular/core';
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
  displayedColumns: string[] = ['No', 'Image', 'Name', 'ArName', 'Actions'];
  dataSource: MatTableDataSource<ICategory>;
  imagePath: string = AppConfig.settings.apiServer.categoryimagepath;
  categories: ICategory[];
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private CategoryService: CategoryService) { }
  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Page Size';
    this.CategoryService.getCategories().subscribe(result => {
      // tslint:disable-next-line:max-line-length
      this.dataSource = new MatTableDataSource<ICategory>((<IResponse>result).Categories);
      this.dataSource.paginator = this.paginator;
      this.resultsLength = (<IResponse>result).Categories.length;
    });
  }

  loadAllICategories(pagesize: number, from: number) {
    // from = from * pagesize;
    // pagesize = pagesize + from
    this.CategoryService.getCategories().subscribe(resultobj => {
      this.dataSource.data = ((<IResponse>resultobj).Categories.slice(from, pagesize));
      this.resultsLength = (<IResponse>resultobj).Categories.length;
    });
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
        var index = this.dataSource.data.findIndex(x=>x.ID==''+ID);
        this.dataSource.data.splice(index,1);
        this.dataSource._updateChangeSubscription();
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
