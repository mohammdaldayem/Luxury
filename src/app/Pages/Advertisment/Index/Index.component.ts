import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AppConfig } from '../../../app.config';
import { IAdvertisment, IResponse } from '../../../models/Response';
import { AdvertismentService } from '../../../Services/Advertisment.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'Image', 'Title', 'Description', 'Actions'];
  dataSource: MatTableDataSource<IAdvertisment>;
  imagePath: string = AppConfig.settings.apiServer.advertimagepath;
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _advertismentService: AdvertismentService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.loadAllIAdvertisment(this.paginator.pageSize, this.paginator.pageIndex);
  }
  loadAllIAdvertisment(pagesize: number, from: number) {
    this._advertismentService.getAllAdvertisments().subscribe(resultobj => {
      this.dataSource = new MatTableDataSource<IAdvertisment>((<IResponse>resultobj).Advertisments.slice(from, pagesize));
      this.resultsLength = (<IResponse>resultobj).Advertisments.length;  // (<IResponse>resultobj).Items.length;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  DeleteItem(ID: Number) {
    console.log(ID);
    this._advertismentService.deletAdvertisment({AdvertismentId: ID}).subscribe(result => {
      const response = <IResponse>result ;
      if (response.success === true) {
        swal({
          title: 'Success',
          text: 'The transaction is succeeded',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
      }).catch(swal.noop);
      this.loadAllIAdvertisment(this.paginator.pageSize, this.paginator.pageIndex);
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
