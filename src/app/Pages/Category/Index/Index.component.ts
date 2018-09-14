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
  displayedColumns: string[] = ['Image', 'Name', 'Actions'];
  dataSource: MatTableDataSource<ICategory>;
  imagePath: string = AppConfig.settings.apiServer.categoryimagepath;
  categories: ICategory[];
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private CategoryService: CategoryService) { }
  ngOnInit() {
    this.CategoryService.getCategories().subscribe(result => {
<<<<<<< HEAD
      // tslint:disable-next-line:max-line-length
      this.dataSource = new MatTableDataSource<ICategory>((<IResponse>result).Categories.slice(this.paginator.pageSize, this.paginator.pageIndex));
      this.resultsLength = (<IResponse>result).Categories.length;
    });
=======

      this.dataSource = new MatTableDataSource<ICategory>((<IResponse>result).Categories.slice(this.paginator.pageIndex, this.paginator.pageSize));
      this.resultsLength = (<IResponse>result).Categories.length;  
    })
>>>>>>> f2dcc128aca44cbb495c26ff3bd50bd5b8150b02
  }

  loadAllICategories(pagesize: number, from: number) {
    // from = from * pagesize;
    // pagesize = pagesize + from
    debugger
    this.CategoryService.getCategories().subscribe(resultobj => {
<<<<<<< HEAD
      this.dataSource = new MatTableDataSource<ICategory>((<IResponse>resultobj).Categories.slice(from, pagesize));
      this.resultsLength = (<IResponse>resultobj).Categories.length;
    });
  }

=======
      this.dataSource.data = ((<IResponse>resultobj).Categories.slice(from, pagesize));
      this.resultsLength = (<IResponse>resultobj).Categories.length;
    });
  }
>>>>>>> f2dcc128aca44cbb495c26ff3bd50bd5b8150b02
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
        // tslint:disable-next-line:no-shadowed-variable
        this.CategoryService.getCategories().subscribe(result => {
          this.dataSource = new MatTableDataSource<ICategory>((<IResponse>result).Categories);
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
