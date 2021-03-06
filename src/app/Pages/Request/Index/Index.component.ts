import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../Services/request.service';
import { SellerService } from '../../../Services/Seller.service';
import { IResponse, IRequest, ISeller, IStatus } from '../../../models/Response';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import * as moment from 'moment';
@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})

export class IndexComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['RequestId', 'ClientName', 'Status', 'Total', 'CreatedAt', 'Actions'];
  dataSource: MatTableDataSource<IRequest>;
  resultsLength: number;
  sellers: ISeller[];
  Statuses: IStatus[] = [];
  allStatus: IStatus;
  pendingtatus: IStatus;
  ProgressStatus: IStatus;
  completedStatus: IStatus;
  declinedStatus: IStatus;
  allSeller: ISeller;
  filterDtaeFrom: Date;
  filterDtaeTo: Date;
  filterSellerId: number;
  filterStatusId: number;
  pagesData: Array<any>;
  currentPageSize: number;
  currentPageIndex: number;
  TodayReq: string;
  Title: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _requestService: RequestService, private _sellerService: SellerService,
     private router: Router, private changeDetectorRefs: ChangeDetectorRef, private route: ActivatedRoute) {
    this.allSeller = new ISeller();
    this.allSeller.NameEn = 'All';
    this.allSeller.ID = '0';

    this.allStatus = new IStatus();
    this.allStatus.StatusName = 'All';
    this.allStatus.ID = '0';

    this.pendingtatus = new IStatus();
    this.pendingtatus.StatusName = 'Pending';
    this.pendingtatus.ID = '1';

    this.ProgressStatus = new IStatus();
    this.ProgressStatus.StatusName = 'In Progress';
    this.ProgressStatus.ID = '2';


    this.completedStatus = new IStatus();
    this.completedStatus.StatusName = 'Completed';
    this.completedStatus.ID = '3';


    this.declinedStatus = new IStatus();
    this.declinedStatus.StatusName = 'Declined';
    this.declinedStatus.ID = '5';

    this.Statuses.push(this.allStatus);
    this.Statuses.push(this.pendingtatus);
    this.Statuses.push(this.ProgressStatus);
    this.Statuses.push(this.completedStatus);
    this.Statuses.push(this.declinedStatus);
    this.route.queryParams.subscribe(params => {
      this.TodayReq = params['Today'];
    });
  }
  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Page Size';
    this._sellerService.getSellers().subscribe(result => {
      this.sellers = (<IResponse>result).Sellers;
      this.sellers.push(this.allSeller);
      this.sellers = this.sellers.reverse();
    });
  }
  ngAfterViewInit(): void {
    this.currentPageSize = 10;
    this.currentPageIndex = 0;
    this.pagesData = new Array<any>();
    if (this.TodayReq === 'T') {
      this.Title = 'Today Request';
      this.filterDtaeFrom = new Date();
      this.filterDtaeTo = new Date();
      this.loadAllTodayRequests(20, this.paginator.pageIndex);
    } else {
      this.Title = 'Requests';
      this.loadAllRequests(20, this.paginator.pageIndex);
    }
  }
  Search() {
    const pagesize = this.paginator.pageSize;
    const dateFrom = this.filterDtaeFrom ? moment(this.filterDtaeFrom).format('YYYY-MM-DD') : '';
    const dateTo = this.filterDtaeTo ? moment(this.filterDtaeTo).format('YYYY-MM-DD') : '';
    const sellerID = this.filterSellerId ? this.filterSellerId : 0;
    const statusID = this.filterStatusId ? this.filterStatusId : 0;
    if (this.TodayReq === 'T') {
      this._requestService.getTodayRequests({
        LoadFrom: 0, PageSize: 20,
        DateFrom: dateFrom, DateTo: dateTo, SellerId: sellerID, StatusId: statusID
      }).subscribe(result => {
        this.pagesData = new Array<any>();
        this.pagesData.push({ pageIndex: this.paginator.pageIndex, data: (<IResponse>result).Requests });
        this.dataSource = new MatTableDataSource<IRequest>((<IResponse>result).Requests.slice(0, this.paginator.pageSize));
        this.changeDetectorRefs.detectChanges();
        this.resultsLength = (<IResponse>result).RequestsCount;
      });
    } else {
      this._requestService.getRequests({
        LoadFrom: 0, PageSize: 20,
        DateFrom: dateFrom, DateTo: dateTo, SellerId: sellerID, StatusId: statusID
      }).subscribe(result => {
        this.pagesData = new Array<any>();
        this.pagesData.push({ pageIndex: this.paginator.pageIndex, data: (<IResponse>result).Requests });
        this.dataSource = new MatTableDataSource<IRequest>((<IResponse>result).Requests.slice(0, this.paginator.pageSize));
        this.changeDetectorRefs.detectChanges();
        this.resultsLength = (<IResponse>result).RequestsCount;
      });
    }
  }

  loadAllRequests(pagesize: number, from: number) {
    if (from !== 0) {
      from = +this.dataSource.data[this.dataSource.data.length - 1].RequestId;
    }
    const dateFrom = this.filterDtaeFrom ? moment(this.filterDtaeFrom).format('YYYY-MM-DD') : '';
    const dateTo = this.filterDtaeTo ? moment(this.filterDtaeTo).format('YYYY-MM-DD') : '';
    const sellerID = this.filterSellerId ? this.filterSellerId : 0;
    const statusID = this.filterStatusId ? this.filterStatusId : 0;
    this._requestService.getRequests({
      LoadFrom: from, PageSize: pagesize,
      DateFrom: dateFrom, DateTo: dateTo, SellerId: sellerID, StatusId: statusID
    }).subscribe(result => {
      this.pagesData.push({ pageIndex: this.paginator.pageIndex, data: (<IResponse>result).Requests });

      this.dataSource = new MatTableDataSource<IRequest>((<IResponse>result).Requests.slice(0, this.paginator.pageSize));
      this.resultsLength = (<IResponse>result).RequestsCount;
      this.dataSource.paginator = this.paginator;
    });
  }
  loadAllTodayRequests(pagesize: number, from: number) {
    if (from !== 0) {
      from = +this.dataSource.data[this.dataSource.data.length - 1].RequestId;
    }
    const dateFrom = this.filterDtaeFrom ? moment(this.filterDtaeFrom).format('YYYY-MM-DD') : '';
    const dateTo = this.filterDtaeTo ? moment(this.filterDtaeTo).format('YYYY-MM-DD') : '';
    const sellerID = this.filterSellerId ? this.filterSellerId : 0;
    const statusID = this.filterStatusId ? this.filterStatusId : 0;
    this._requestService.getTodayRequests({
      LoadFrom: from, PageSize: pagesize,
      DateFrom: dateFrom, DateTo: dateTo, SellerId: sellerID, StatusId: statusID
    }).subscribe(result => {
      this.pagesData.push({ pageIndex: this.paginator.pageIndex, data: (<IResponse>result).Requests });

      this.dataSource = new MatTableDataSource<IRequest>((<IResponse>result).Requests.slice(0, this.paginator.pageSize));
      this.resultsLength = (<IResponse>result).RequestsCount;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRequest(id) {
    this._requestService.deleteRequest({ RequestId: id }).subscribe(result => {
      const response = <IResponse>result;
      if (response.success === true) {
        swal({
          title: 'Success',
          text: 'The transaction is succeeded',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
        }).catch(swal.noop);
        this.reloadCurentPageData(id);
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
      var currentPageData = <Array<IRequest>>result.data.slice(0, this.paginator.pageSize);
      this.dataSource = new MatTableDataSource<IRequest>(currentPageData);
      this.changeDetectorRefs.detectChanges();
    }
    else {

      this.getPageData(this.dataSource.data[this.dataSource.data.length - 1].RequestId)
    }
  }

  pagesExisitData(pageIndex: Number) {
    var result = this.pagesData.find(x => x.pageIndex == pageIndex);
    return result;
  }

  getPageData(from) {
    const dateFrom = this.filterDtaeFrom ? moment(this.filterDtaeFrom).format('YYYY-MM-DD') : '';
    const dateTo = this.filterDtaeTo ? moment(this.filterDtaeTo).format('YYYY-MM-DD') : '';
    const sellerID = this.filterSellerId ? this.filterSellerId : 0;
    const statusID = this.filterStatusId ? this.filterStatusId : 0;
    if (this.TodayReq === 'T') {
      this._requestService.getTodayRequests({
        LoadFrom: from, PageSize: 20,
        DateFrom: dateFrom, DateTo: dateTo, SellerId: sellerID, StatusId: statusID
      }).subscribe(resultobj => {
        this.pagesData.push({ pageIndex: this.currentPageIndex, data: (<IResponse>resultobj).Requests })
        this.dataSource = new MatTableDataSource<IRequest>((<IResponse>resultobj).Requests.slice(0, this.paginator.pageSize));
        this.changeDetectorRefs.detectChanges();
      });
    } else {
      this._requestService.getRequests({
        LoadFrom: from, PageSize: 20,
        DateFrom: dateFrom, DateTo: dateTo, SellerId: sellerID, StatusId: statusID
      }).subscribe(resultobj => {
        this.pagesData.push({ pageIndex: this.currentPageIndex, data: (<IResponse>resultobj).Requests })
        this.dataSource = new MatTableDataSource<IRequest>((<IResponse>resultobj).Requests.slice(0, this.paginator.pageSize));
        this.changeDetectorRefs.detectChanges();
      });
    }
  }

  reloadCurentPageData(ID: Number) {
    var isFirstItem = (this.dataSource.data[0].RequestId == ID.toString());
    var firstItem = this.dataSource.data[0];
    let from = this.dataSource.data[0].RequestId;
    const dateFrom = this.filterDtaeFrom ? moment(this.filterDtaeFrom).format('YYYY-MM-DD') : '';
    const dateTo = this.filterDtaeTo ? moment(this.filterDtaeTo).format('YYYY-MM-DD') : '';
    const sellerID = this.filterSellerId ? this.filterSellerId : 0;
    const statusID = this.filterStatusId ? this.filterStatusId : 0;
    if (this.TodayReq === 'T') {
      this._requestService.getTodayRequests({
        LoadFrom: from, PageSize: 20,
        DateFrom: dateFrom, DateTo: dateTo, SellerId: sellerID, StatusId: statusID
      }).subscribe(resultobj => {
        var result = (<IResponse>resultobj).Requests;
        if (!isFirstItem) {
          result.pop();
          result.unshift(firstItem);
        }
        this.dataSource = new MatTableDataSource<IRequest>(result.slice(0, this.paginator.pageSize));
        this.changeDetectorRefs.detectChanges();
        this.pagesData.splice(this.paginator.pageIndex, this.pagesData.length);
        this.pagesData.push({ pageIndex: this.paginator.pageIndex, data: result })
      });
    } else {
      this._requestService.getRequests({
        LoadFrom: from, PageSize: 20,
        DateFrom: dateFrom, DateTo: dateTo, SellerId: sellerID, StatusId: statusID
      }).subscribe(resultobj => {
        var result = (<IResponse>resultobj).Requests;
        if (!isFirstItem) {
          result.pop();
          result.unshift(firstItem);
        }
        this.dataSource = new MatTableDataSource<IRequest>(result.slice(0, this.paginator.pageSize));
        this.changeDetectorRefs.detectChanges();
        this.pagesData.splice(this.paginator.pageIndex, this.pagesData.length);
        this.pagesData.push({ pageIndex: this.paginator.pageIndex, data: result })
      });
    }
  }

}
