import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '../../../../../node_modules/@angular/material';
import { ISeller, IItem, IResponse } from '../../../models/Response';
import { ItemService } from '../../../Services/Item.service';
import swal from 'sweetalert2';
import { AppConfig } from '../../../app.config';
@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = [ 'Image', 'English Name', 'Arabic Name', 'Created At', 'Seller Name', 'Actions'];
  dataSource: MatTableDataSource<IItem>;
  imagePath: string = AppConfig.settings.apiServer.itemimagepath;
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _itemService: ItemService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.loadAllItems(this.paginator.pageSize, this.paginator.pageIndex);
  }
  loadAllItems(pagesize: number, from: number) {
    this._itemService.getAllItems({LoadFrom: (pagesize * from) + 1, PageSize: pagesize}).subscribe(resultobj => {
      this.dataSource = new MatTableDataSource<IItem>((<IResponse>resultobj).Items);
      this.resultsLength = 33;  // (<IResponse>resultobj).Items.length;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  DeleteItem(ID: Number) {
    console.log(ID);
    this._itemService.deletItem({ItemId: ID}).subscribe(result => {
      const response = <IResponse>result ;
      if (response.success === true) {
        swal({
          title: 'Success',
          text: 'The transaction is succeeded',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
      }).catch(swal.noop);
      this.loadAllItems(this.paginator.pageSize, this.paginator.pageIndex);
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
