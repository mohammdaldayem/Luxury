import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../Services/request.service';
import { SellerService } from '../../../Services/Seller.service';
import { IResponse, IRequest, ISeller } from '../../../models/Response';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})

export class IndexComponent implements OnInit {
 displayedColumns: string[] = [ 'RequestId', 'ClientName', 'Phone', 'Total', 'CreatedAt', 'Actions'];
    dataSource: MatTableDataSource<IRequest>;
    sellers: ISeller[];
Statuses: [{ID: 1, NameEN: 'Pending'}, {ID: 2, NameEN: 'In Progress'}, {ID: 3, NameEN: 'Completed'}, {ID: 4, NameEN: 'Declined'}];

 constructor(private _requestService: RequestService , private _sellerService: SellerService, private router: Router) {}
  ngOnInit() {
      this._requestService.getRequests({LoadFrom: 0, PageSize: 100000}).subscribe(result => {
        this.dataSource = new MatTableDataSource<IRequest>((<IResponse>result).Requests);
      });
      this._sellerService.getSellers().subscribe(result => {
        this.sellers = (<IResponse>result).Sellers;
      });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
