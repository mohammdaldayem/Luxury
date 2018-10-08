import { Component, OnInit, AfterViewInit,ViewChild,ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../Services/request.service';
import { SellerService } from '../../../Services/Seller.service';
import { IResponse, IRequest, ISeller, IStatus } from '../../../models/Response';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
 //import { moment } from 'ngx-bootstrap/chronos/test/chain';
 import * as moment from 'moment';
@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})

export class IndexComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['RequestId', 'ClientName','Status', 'Total', 'CreatedAt', 'Actions'];
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
  filterDtaeFrom : Date;
  filterDtaeTo : Date;
  filterSellerId : number;
  filterStatusId : number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _requestService: RequestService, private _sellerService: SellerService, private router: Router,private changeDetectorRefs: ChangeDetectorRef) {
    this.allSeller = new ISeller();
    this.allSeller.Name = 'All';
    this.allSeller.ID ='0';

    this.allStatus = new IStatus();
    this.allStatus.StatusName = 'All';
    this.allStatus.ID = '0';

    this.pendingtatus = new IStatus();
    this.pendingtatus.StatusName = 'Pending';
    this.pendingtatus.ID = '1';

    this.ProgressStatus = new IStatus();
    this.ProgressStatus.StatusName = 'AIn Progressll';
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
  }
  ngOnInit() {
   
    this._sellerService.getSellers().subscribe(result => {
      this.sellers = (<IResponse>result).Sellers;
      this.sellers.push(this.allSeller);
      this.sellers = this.sellers.reverse();
    });
  }
  ngAfterViewInit(): void {
    this.loadAllRequests(this.paginator.pageSize, this.paginator.pageIndex);
  }
  Search(){
    debugger;
    const pagesize =this.paginator.pageSize;
    let from =this.paginator.pageIndex;
    if(from != 0)
    {
      from  = +this.dataSource.data[this.dataSource.data.length -1].RequestId;
    }
    const dateFrom = this.filterDtaeFrom ? moment(this.filterDtaeFrom).format('YYYY-MM-DD'):'';
    const dateTo = this.filterDtaeTo ? moment(this.filterDtaeTo).format('YYYY-MM-DD'):'';
    const sellerID = this.filterSellerId ? this.filterSellerId : 0;
    const statusID = this.filterStatusId ? this.filterStatusId : 0;
    this._requestService.getRequests({ LoadFrom: from , PageSize: pagesize ,
       DateFrom: dateFrom,DateTo: dateTo,SellerId: sellerID,StatusId: statusID }).subscribe(result => {
      this.dataSource = new MatTableDataSource<IRequest>((<IResponse>result).Requests);
      this.changeDetectorRefs.detectChanges();
    });
  }
  loadAllRequests(pagesize: number, from: number) {
    
    if(from != 0)
    {
      from  = +this.dataSource.data[this.dataSource.data.length -1].RequestId;
    }
    const dateFrom = this.filterDtaeFrom ? moment(this.filterDtaeFrom).format('YYYY-MM-DD'):'';
    const dateTo = this.filterDtaeTo ? moment(this.filterDtaeTo).format('YYYY-MM-DD'):'';
    const sellerID = this.filterSellerId ? this.filterSellerId : 0;
    const statusID = this.filterStatusId ? this.filterStatusId : 0;
    this._requestService.getRequests({ LoadFrom: from , PageSize: pagesize ,
       DateFrom: dateFrom,DateTo: dateTo,SellerId: sellerID,StatusId: statusID }).subscribe(result => {
      this.dataSource = new MatTableDataSource<IRequest>((<IResponse>result).Requests);
      this.resultsLength = (<IResponse>result).RequestsCount;
      this.dataSource.paginator = this.paginator;
    });
  }
 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRequest(id) {
    this._requestService.deleteRequest({RequestId : id}).subscribe(result => {
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
        this._requestService.getRequests({ LoadFrom: 0, PageSize: 100000 }).subscribe(result => {
          this.dataSource = new MatTableDataSource<IRequest>((<IResponse>result).Requests);
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
