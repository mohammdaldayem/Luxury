import { Component, OnInit,ViewChild } from '@angular/core';
import { SellerService } from '../../../Services/Seller.service';
import { IResponse, ISeller } from '../../../models/Response';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import swal from 'sweetalert2';
@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})
export class IndexComponent implements OnInit {
  displayedColumns: string[] = [ 'Name', 'Phone', 'Address', 'Actions'];
  dataSource: MatTableDataSource<ISeller>;
  totalCount: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _sellerService: SellerService) { }

  ngOnInit() {
    this._sellerService.getSellers().subscribe(result => {
      this.dataSource = new MatTableDataSource<ISeller>((<IResponse>result).Sellers);
      this.totalCount = ((<IResponse>result).Sellers).length;
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  DeleteSeller(ID: Number) {
    console.log(ID);
    this._sellerService.deletSellers({SellerId: ID}).subscribe(result => {
      const response = <IResponse>result ;
      if (response.success === true) {
        swal({
          title: 'Success',
          text: 'The transaction is succeeded',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
      }).catch(swal.noop);
      var index = this.dataSource.data.findIndex(x=>x.ID==''+ID);
      this.dataSource.data.splice(index,1);
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
