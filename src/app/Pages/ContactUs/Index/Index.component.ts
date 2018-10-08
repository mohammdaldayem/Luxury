import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator,PageEvent } from '@angular/material';
import { IMessage, IResponse } from '../../../models/Response';
import { ContactUsService } from '../../../Services/ContactUs.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})
export class IndexComponent implements AfterViewInit {

  displayedColumns: string[] = [ 'Name', 'Email', 'Phone', 'Message', 'CreatedAt', 'Actions'];
  dataSource: MatTableDataSource<IMessage>;
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _contactusservice: ContactUsService) { }


  ngAfterViewInit(): void {
    this.loadAllItems(this.paginator.pageSize, this.paginator.pageIndex);
  }
  loadAllItems(pagesize: number, from: number) {
    debugger;
    if(from != 0)
    {
      from  = +this.dataSource.data[this.dataSource.data.length -1].ID;
    }
    this._contactusservice.getAllMessages({LoadFrom: from, PageSize: pagesize}).subscribe(resultobj => {
      this.dataSource = new MatTableDataSource<IMessage>((<IResponse>resultobj).Messages);
      this.resultsLength = (<IResponse>resultobj).AllMessagesCount;
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  DeleteContactUs(ID: Number) {
    console.log(ID);
    this._contactusservice.deletMessage({MessageId: ID}).subscribe(result => {
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
