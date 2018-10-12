import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISeller, IItem, IResponse } from '../../../models/Response';
import { ItemService } from '../../../Services/Item.service';
import swal from 'sweetalert2';
import { AppConfig } from '../../../app.config';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = [ 'Image', 'English Name', 'Arabic Name', 'Created At', 'Seller Name', 'Actions'];
  dataSource: MatTableDataSource<IItem>;
  pageEvent: PageEvent;
  imagePath: string = AppConfig.settings.apiServer.itemimagepath;
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _itemService: ItemService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.loadAllItems(this.paginator.pageSize, this.paginator.pageIndex);
  }
  loadAllItems(pagesize: number, from: number) {
    if (from !== 0) {
      from  = +this.dataSource.data[this.dataSource.data.length - 1].ItemInfo.ID;
    }
    this._itemService.getAllItems({LoadFrom: from, PageSize: pagesize}).subscribe(resultobj => {
      this.dataSource = new MatTableDataSource<IItem>((<IResponse>resultobj).Items);
      this.resultsLength = (<IResponse>resultobj).TotalItemsCount;
      this.dataSource.paginator = this.paginator;
    });
  }
  loadNextPage() {
    debugger;
    const pagesize = this.paginator.pageSize;
    let from = this.paginator.pageIndex;
    if (from !== 0) {
      from  = +this.dataSource.data[this.dataSource.data.length - 1].ItemInfo.ID;
    }
    this._itemService.getAllItems({LoadFrom: from, PageSize: pagesize}).subscribe(resultobj => {
      this.dataSource = new MatTableDataSource<IItem>((<IResponse>resultobj).Items);
      this.changeDetectorRefs.detectChanges();
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
