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
export class IndexComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Image', 'English Name', 'Arabic Name', 'Created At', 'Seller Name', 'Actions'];
  dataSource: MatTableDataSource<IItem>;
  pageEvent: PageEvent;
  imagePath: string = AppConfig.settings.apiServer.itemimagepath;
  resultsLength = 0;
  pagesData: Array<any>;
  currentPageSize: number;
  currentPageIndex: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _itemService: ItemService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.pagesData = new Array<any>();
    this.loadAllItems(20, this.paginator.pageIndex);
    this.currentPageSize = 10;
    this.currentPageIndex = 0;
  }

  loadAllItems(pagesize: number, from: number) {
    if (from !== 0) {
      from = +this.dataSource.data[this.dataSource.data.length - 1].ItemInfo.ID;
    }
    this._itemService.getAllItems({ LoadFrom: from, PageSize: pagesize }).subscribe(resultobj => {
      this.pagesData.push({ pageIndex: this.paginator.pageIndex, data: (<IResponse>resultobj).Items })
      this.dataSource = new MatTableDataSource<IItem>((<IResponse>resultobj).Items.slice(0, this.paginator.pageSize));
      this.resultsLength = (<IResponse>resultobj).TotalItemsCount;
      this.dataSource.paginator = this.paginator;
    });
  }

  loadNextPrevious(any) {
    if (this.paginator.pageSize == this.currentPageSize) {
       this.currentPageIndex = this.paginator.pageIndex;
    }
    else{
      this.paginator.pageIndex =  this.currentPageIndex;
      this.currentPageSize = this.paginator.pageSize;
    }

    var result = this.pagesExisitData(this.currentPageIndex);
    if (result) {
      var currentPageData = <Array<IItem>>result.data.slice(0, this.paginator.pageSize);
      this.dataSource = new MatTableDataSource<IItem>(currentPageData);
      this.changeDetectorRefs.detectChanges();
    }
    else {
      this.getPageData(this.dataSource.data[this.dataSource.data.length - 1].ItemInfo.ID)
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  DeleteItem(ID: Number) {
    this._itemService.deletItem({ ItemId: ID }).subscribe(result => {
      const response = <IResponse>result;
      if (response.success === true) {
        swal({
          title: 'Success',
          text: 'The transaction is succeeded',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
        }).catch(swal.noop);
        this.reloadCurentPageData(ID);
        this.resultsLength--;
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

  getPageData(from) {
    this._itemService.getAllItems({ LoadFrom: from, PageSize: 20 }).subscribe(resultobj => {
      this.pagesData.push({ pageIndex: this.currentPageIndex, data: (<IResponse>resultobj).Items })
      this.dataSource = new MatTableDataSource<IItem>((<IResponse>resultobj).Items.slice(0, this.paginator.pageSize));
      this.changeDetectorRefs.detectChanges();
    });
  }

  pagesExisitData(pageIndex: Number) {
    var result = this.pagesData.find(x => x.pageIndex == pageIndex);
    
    return result;
  }

  reloadCurentPageData(ID: Number) {
    var isFirstItem = (this.dataSource.data[0].ItemInfo.ID == ID.toString());
    var firstItem = this.dataSource.data[0];
    let from = this.dataSource.data[0].ItemInfo.ID;
    this._itemService.getAllItems({ LoadFrom: from, PageSize: 20 }).subscribe(resultobj => {
      var result = (<IResponse>resultobj).Items;
      if (!isFirstItem) {
        result.pop();
        result.unshift(firstItem);
      }
      this.dataSource = new MatTableDataSource<IItem>(result.slice(0, this.paginator.pageSize));
      this.changeDetectorRefs.detectChanges();
      this.pagesData.splice(this.paginator.pageIndex, this.pagesData.length);
      this.pagesData.push({ pageIndex: this.paginator.pageIndex, data: result });
    });
  }
}
