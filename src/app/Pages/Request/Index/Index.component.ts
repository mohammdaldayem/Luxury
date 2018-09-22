import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../Services/request.service';
import { SellerService } from '../../../Services/Seller.service';
import { IResponse, IRequest, ISeller, IStatus } from '../../../models/Response';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})

export class IndexComponent implements OnInit {
  displayedColumns: string[] = ['RequestId', 'ClientName', 'Phone','Status', 'Total', 'CreatedAt', 'Actions'];
  dataSource: MatTableDataSource<IRequest>;
  sellers: ISeller[];
  Statuses: IStatus[] = [];
  allStatus: IStatus;
  pendingtatus: IStatus;
  ProgressStatus: IStatus;
  completedStatus: IStatus;
  declinedStatus: IStatus;
  allSeller: ISeller;

  constructor(private _requestService: RequestService, private _sellerService: SellerService, private router: Router) {
    this.allSeller = new ISeller();
    this.allSeller.Name = 'All';

    this.allStatus = new IStatus();
    this.allStatus.StatusName = 'All';

    this.pendingtatus = new IStatus();
    this.pendingtatus.StatusName = 'Pending';
    this.pendingtatus.ID = '1';

    this.ProgressStatus = new IStatus();
    this.ProgressStatus.StatusName = 'AIn Progressll';
    this.pendingtatus.ID = '2';


    this.completedStatus = new IStatus();
    this.completedStatus.StatusName = 'Completed';
    this.pendingtatus.ID = '3';


    this.declinedStatus = new IStatus();
    this.declinedStatus.StatusName = 'Declined';
    this.pendingtatus.ID = '5';

    this.Statuses.push(this.allStatus);
    this.Statuses.push(this.pendingtatus);
    this.Statuses.push(this.ProgressStatus);
    this.Statuses.push(this.completedStatus);
    this.Statuses.push(this.declinedStatus);

  }

  ngOnInit() {
    this._requestService.getRequests({ LoadFrom: 0, PageSize: 100000 }).subscribe(result => {
      this.dataSource = new MatTableDataSource<IRequest>((<IResponse>result).Requests);
    });
    this._sellerService.getSellers().subscribe(result => {
      this.sellers = (<IResponse>result).Sellers;
      this.sellers.push(this.allSeller);
      this.sellers = this.sellers.reverse();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteRequest(id) {
    this._requestService.deleteRequest({value : id}).subscribe(result => {
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
