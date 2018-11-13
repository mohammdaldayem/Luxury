import { CategoryService } from './../../../Services/CategoryService.service';
import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { SubCategoryService } from '../../../Services/SubCategory.service';
import { IResponse, ISubCategory, ICategory } from '../../../models/Response';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppConfig } from '../../../app.config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})

export class IndexComponent implements OnInit ,AfterContentInit {
  ngAfterContentInit(): void {
    this.loadAllISubCategories(this.paginator.pageSize , this.paginator.pageIndex)
  }

  // tslint:disable-next-line:member-ordering
  displayedColumns: string[] = ['No', 'Image', 'Name', 'ArName', 'Actions'];
  dataSource: MatTableDataSource<ISubCategory>;
  imagePath: string = AppConfig.settings.apiServer.subCategoryimagepath;
  categories: ICategory[];
  category: string;
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private CategoryService: CategoryService, private SubCategoryService: SubCategoryService) { }
  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Page Size';
    this.CategoryService.getCategories().subscribe(result => {
      this.categories = ((<IResponse>result).Categories);
    })
  }

  loadAllISubCategories(pagesize: number, from: number) {
    const mainCategory = this.category?this.category:0;
    this.SubCategoryService.getSupCategories({ MainCategoryId: mainCategory }).subscribe(result => {
      this.dataSource = new MatTableDataSource<ISubCategory>((<IResponse>result).SubCategories);
      this.dataSource.paginator = this.paginator;
      this.resultsLength = (<IResponse>result).SubCategories.length;
    });
  }

  changeCategory() {
    debugger;
    this.SubCategoryService.getSupCategories({ MainCategoryId: this.category }).subscribe(result => {
      this.dataSource = new MatTableDataSource<ISubCategory>((<IResponse>result).SubCategories),
        this.dataSource.paginator = this.paginator;
      this.resultsLength = (<IResponse>result).SubCategories.length;
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
        var index = this.dataSource.data.findIndex(x => x.ID == '' + ID);
        this.dataSource.data.splice(index, 1);
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
