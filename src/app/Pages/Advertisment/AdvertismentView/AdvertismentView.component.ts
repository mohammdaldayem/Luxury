import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdvertismentService } from '../../../Services/Advertisment.service';
import { ActivatedRoute } from '@angular/router';
import { IAdvertisment, IResponse } from '../../../models/Response';
import swal from 'sweetalert2';

@Component({
  selector: 'app-adv-view',
  templateUrl: './AdvertismentView.component.html',
  styleUrls: ['./AdvertismentView.component.css']
})
export class AdvertismentViewComponent implements OnInit {
  enTitleFormControl = new FormControl('', [
    Validators.required,
  ]);
  arTitleFormControl = new FormControl('', [
    Validators.required,
  ]);
  enDescFormControl = new FormControl('', [
    Validators.required,
  ]);
  arDescFormControl = new FormControl('', [
    Validators.required,
  ]);
  imageFormControl = new FormControl('', [
    Validators.required,
  ]);
  ID: Number;
  fileToUpload: File = null;
  constructor(private _advertismentService: AdvertismentService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
  });
   }

   ngOnInit() {
    if (this.ID !== undefined && this.ID !== 0) {
      this._advertismentService.getAdvertismentDetails({AdvertismentId: this.ID}).subscribe(result => {
        const advertisment: IAdvertisment = <IAdvertisment>((<IResponse>result).ItemInfo);
         this.enTitleFormControl.setValue(advertisment.Title);
         this.arTitleFormControl.setValue(advertisment.Title);
         this.enDescFormControl.setValue(advertisment.Description);
         this.arDescFormControl.setValue(advertisment.Description);
      });
         }
  }
  previewImage(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  AddUpdateAdvertisment() {
//  if (!this.form.valid) {
//      return;
//    }
    let response: any ;
    if (this.ID !== undefined && this.ID !== 0) {
// tslint:disable-next-line:max-line-length
this._advertismentService.updateAdvertisment({AdvertismentId: this.ID, TitleAr: this.arTitleFormControl.value, TitleEn: this.enTitleFormControl.value, DescriptionAr: this.arDescFormControl.value, DescriptionEn: this.enDescFormControl.value}).subscribe(result => {
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
      this._advertismentService.addAdvertisment({TitleAr: this.arTitleFormControl.value, TitleEn: this.enTitleFormControl.value, DescriptionAr: this.arDescFormControl.value, DescriptionEn: this.enDescFormControl.value}).subscribe(result => {
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
