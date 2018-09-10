import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AreaService } from '../../../Services/Area.service';
import { ActivatedRoute } from '@angular/router';
import { IArea, IResponse } from '../../../models/Response';
import swal from 'sweetalert2';

@Component({
  selector: 'app-areaview',
  templateUrl: './AreaView.component.html',
  styleUrls: ['./AreaView.component.css']
})
export class AreaViewComponent implements OnInit {
  enNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  arNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  ID: Number;
  constructor(private _areaService: AreaService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
  });
   }

  ngOnInit() {
    if (this.ID !== undefined && this.ID !== 0) {
      this._areaService.getAreaDetails({AreaId: this.ID}).subscribe(result => {
        const area: IArea = <IArea>((<IResponse>result).AreaInfo);
         this.enNameFormControl.setValue(area.Name);
         this.arNameFormControl.setValue(area.ArName);
      });
         }
  }
  AddUpdateArea() {
//  if (!this.form.valid) {
//      return;
//    }
    let response: any ;
    if (this.ID !== undefined && this.ID !== 0) {
// tslint:disable-next-line:max-line-length
this._areaService.updateAreas({AreaId: this.ID, NameAr: this.arNameFormControl.value, NameEn: this.enNameFormControl.value}).subscribe(result => {
  response = <IResponse>result ;
  if (response.success === true) {
    swal({
      title: 'Success',
      text: 'The transaction is succeeded',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-success',
      type: 'success'
  }).catch(swal.noop);
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
     } else {
      // tslint:disable-next-line:max-line-length
      this._areaService.addAreas({NameAr: this.arNameFormControl.value, NameEn: this.enNameFormControl.value}).subscribe(result => {
          response = <IResponse>result ;
          if (response.success === true) {
            swal({
              title: 'Success',
              text: 'The transaction is succeeded',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              type: 'success'
          }).catch(swal.noop);
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

}
