import { Component, OnInit } from '@angular/core';
import { IArea, IResponse } from '../../../models/Response';
import { MatTableDataSource } from '@angular/material';
import { AreaService } from '../../../Services/Area.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})
export class IndexComponent implements OnInit {
  displayedColumns: string[] = [ 'Name', 'Actions'];
  dataSource: MatTableDataSource<IArea>;
  constructor(private _areaService: AreaService) { }

  ngOnInit() {
    this._areaService.getAreas().subscribe(result => {
      this.dataSource = new MatTableDataSource<IArea>((<IResponse>result).Areas);
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  DeleteArea(ID: Number) {
    console.log(ID);
    this._areaService.deletAreas({AreaId: ID}).subscribe(result => {
      const response = <IResponse>result ;
      if (response.success === true) {
        swal({
          title: 'Success',
          text: 'The transaction is succeeded',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
      }).catch(swal.noop);
      this._areaService.getAreas().subscribe(resultobj => {
        this.dataSource = new MatTableDataSource<IArea>((<IResponse>result).Areas);
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
