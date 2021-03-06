import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { IMessage, IResponse } from '../../../models/Response';
import { ContactUsService } from '../../../Services/ContactUs.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['No', 'Name', 'Email', 'Phone', 'Message', 'CreatedAt', 'Actions'];
  dataSource: MatTableDataSource<IMessage>;
  resultsLength = 0;
  pagesData: Array<any>;
  currentPageSize: number;
  currentPageIndex: number;
  TodayReq: string;
  Title: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _contactusservice: ContactUsService, private changeDetectorRefs: ChangeDetectorRef, private route: ActivatedRoute) {
    this.pagesData = new Array<any>();
    this.currentPageSize = 10;
    this.currentPageIndex = 0;
    this.route.queryParams.subscribe(params => {
      this.TodayReq = params['Today'];
    });
  }
ngOnInit() {
  this.paginator._intl.itemsPerPageLabel = 'Page Size';
}
  ngAfterViewInit(): void {
    if (this.TodayReq === 'T') {
      this.Title = 'Today Contact Us';
      this.loadTodayItems(20, this.paginator.pageIndex);
    } else {
      this.Title = 'Contact Us';
        this.loadAllItems(20, this.paginator.pageIndex);
      }
  }
  loadAllItems(pagesize: number, from: number) {
    if (from !== 0) {
      from = +this.dataSource.data[this.dataSource.data.length - 1].ID;
    }
    this._contactusservice.getAllMessages({ LoadFrom: from, PageSize: pagesize }).subscribe(resultobj => {
      this.pagesData.push({ pageIndex: this.paginator.pageIndex, data: (<IResponse>resultobj).Messages });
      this.dataSource = new MatTableDataSource<IMessage>((<IResponse>resultobj).Messages);
      this.resultsLength = (<IResponse>resultobj).AllMessagesCount;
      this.dataSource.paginator = this.paginator;
    });
  }
  loadTodayItems(pagesize: number, from: number) {
    if (from !== 0) {
      from = +this.dataSource.data[this.dataSource.data.length - 1].ID;
    }
    this._contactusservice.getTodayMessages({ LoadFrom: from, PageSize: pagesize }).subscribe(resultobj => {
      this.pagesData.push({ pageIndex: this.paginator.pageIndex, data: (<IResponse>resultobj).TodayMessages });
      this.dataSource = new MatTableDataSource<IMessage>((<IResponse>resultobj).TodayMessages);
      this.resultsLength = (<IResponse>resultobj).TodayMessagesCount;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  DeleteContactUs(ID: Number) {
    console.log(ID);
    this._contactusservice.deletMessage({ MessageId: ID }).subscribe(result => {
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


  loadNextPrevious(any) {
    if (this.paginator.pageSize == this.currentPageSize) {
      this.currentPageIndex = this.paginator.pageIndex;
    }
    else {
      this.paginator.pageIndex = this.currentPageIndex;
      this.currentPageSize = this.paginator.pageSize;
    }

    var result = this.pagesExisitData(this.currentPageIndex);
    if (result) {
      var currentPageData = <Array<IMessage>>result.data.slice(0, this.paginator.pageSize);
      this.dataSource = new MatTableDataSource<IMessage>(currentPageData);
      this.changeDetectorRefs.detectChanges();
    }
    else {
      this.getPageData(this.dataSource.data[this.dataSource.data.length - 1].ID)
    }
  }


  pagesExisitData(pageIndex: Number) {
    var result = this.pagesData.find(x => x.pageIndex == pageIndex);
    return result;
  }
  getPageData(from) {
    if (this.TodayReq === 'T') {
      this._contactusservice.getTodayMessages({ LoadFrom: from, PageSize: 20 }).subscribe(resultobj => {
        this.pagesData.push({ pageIndex: this.currentPageIndex, data: (<IResponse>resultobj).TodayMessages });
        this.dataSource = new MatTableDataSource<IMessage>((<IResponse>resultobj).TodayMessages.slice(0, this.paginator.pageSize));
        this.changeDetectorRefs.detectChanges();
      });
    } else {
      this._contactusservice.getAllMessages({ LoadFrom: from, PageSize: 20 }).subscribe(resultobj => {
        this.pagesData.push({ pageIndex: this.currentPageIndex, data: (<IResponse>resultobj).Messages });
        this.dataSource = new MatTableDataSource<IMessage>((<IResponse>resultobj).Messages.slice(0, this.paginator.pageSize));
        this.changeDetectorRefs.detectChanges();
      });
    }
  }

  reloadCurentPageData(ID: Number) {
    var isFirstItem = (this.dataSource.data[0].ID == ID);
    var firstItem = this.dataSource.data[0];
    let from = this.dataSource.data[0].ID;
    if (this.TodayReq === 'T') {
      this._contactusservice.getTodayMessages({ LoadFrom: from, PageSize: 20 }).subscribe(resultobj => {
        var result = (<IResponse>resultobj).TodayMessages;
        if (!isFirstItem) {
          result.pop();
          result.unshift(firstItem);
        }
        this.dataSource = new MatTableDataSource<IMessage>(result.slice(0, this.paginator.pageSize));
        
        this.changeDetectorRefs.detectChanges();
        this.pagesData.splice(this.paginator.pageIndex, this.pagesData.length);
        this.pagesData.push({ pageIndex: this.paginator.pageIndex, data: this.dataSource });
      });
    } else {
      this._contactusservice.getAllMessages({ LoadFrom: from, PageSize: 20 }).subscribe(resultobj => {
        var result = (<IResponse>resultobj).Messages;
        if (!isFirstItem) {
          result.pop();
          result.unshift(firstItem);
        }
        this.dataSource = new MatTableDataSource<IMessage>(result.slice(0, this.paginator.pageSize));
        
        this.changeDetectorRefs.detectChanges();
        this.pagesData.splice(this.paginator.pageIndex, this.pagesData.length);
        this.pagesData.push({ pageIndex: this.paginator.pageIndex, data: this.dataSource })
      });
    }
    
  }
}
   