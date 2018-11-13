import { Component, OnInit,ViewChild } from '@angular/core';
import { IArea, IResponse } from '../../../models/Response';
import { MatTableDataSource,MatPaginator } from '@angular/material';
import { AreaService } from '../../../Services/Area.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})
export class IndexComponent implements OnInit {
  displayedColumns: string[] = [ 'No','EnName', 'ArName', 'Actions'];
  dataSource: MatTableDataSource<IArea>;
  constructor(private _areaService: AreaService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Page Size';
    this._areaService.getAreas().subscribe(result => {
      this.dataSource = new MatTableDataSource<IArea>((<IResponse>result).Areas);
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  DeleteArea(ID: Number) {
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
