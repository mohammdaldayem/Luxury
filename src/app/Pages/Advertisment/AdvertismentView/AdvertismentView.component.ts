import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AdvertismentService } from '../../../Services/Advertisment.service';
import { ActivatedRoute } from '@angular/router';
import { IAdvertisment, IResponse } from '../../../models/Response';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../../../app.config';
@Component({
  selector: 'app-adv-view',
  templateUrl: './AdvertismentView.component.html',
  styleUrls: ['./AdvertismentView.component.css']
})
export class AdvertismentViewComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean;
  enTitleFormControl: FormControl;
  arTitleFormControl: FormControl;
  enDescFormControl: FormControl;
  arDescFormControl: FormControl;
  ID: Number;
  elementImage: string = null;
  fileToUpload: File = null;
  imagePath: string = AppConfig.settings.apiServer.advertimagepath;

  constructor(private _advertismentService: AdvertismentService, private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
    });
    this.form = new FormGroup({});

    this.enTitleFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.arTitleFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.enDescFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.arDescFormControl = new FormControl('', [
      Validators.required,
    ]);

    this.form.addControl('enTitleFormControl', this.enTitleFormControl);
    this.form.addControl('arTitleFormControl', this.arTitleFormControl);
    this.form.addControl('enDescFormControl', this.enDescFormControl);
    this.form.addControl('arDescFormControl', this.arDescFormControl);

  }

  ngOnInit() {
    if (this.ID !== undefined && this.ID !== 0) {
      this._advertismentService.getAdvertismentDetails({ AdvertismentId: this.ID }).subscribe(result => {
        const advertisment: IAdvertisment = <IAdvertisment>((<IResponse>result).ItemInfo);
        this.enTitleFormControl.setValue(advertisment.Title);
        this.arTitleFormControl.setValue(advertisment.Title);
        this.enDescFormControl.setValue(advertisment.Description);
        this.arDescFormControl.setValue(advertisment.Description);
        this.elementImage = advertisment.Image;
        this.imagePath = AppConfig.settings.apiServer.advertimagepath;
      });
    }
  }
  previewImage(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  AddUpdateAdvertisment() {
    this.isSubmitted = true;
    if (this.form.status === 'INVALID' || !this.fileToUpload) {
      return;
    }
    let response: any;
    if (this.ID !== undefined && this.ID !== 0) {
      // tslint:disable-next-line:max-line-length
      this._advertismentService.updateAdvertisment({ AdvertismentId: this.ID, TitleAr: this.arTitleFormControl.value, TitleEn: this.enTitleFormControl.value, DescriptionAr: this.arDescFormControl.value, DescriptionEn: this.enDescFormControl.value, image: this.fileToUpload, name: this.fileToUpload.name }).subscribe(result => {
        response = <IResponse>result;
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
      const httpOptions = {
        headers: new HttpHeaders()
          .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
          .append('Accept-Language', 'Ar')
      };
      const formData: FormData = new FormData();
      formData.append('TitleAr', this.arTitleFormControl.value);
      formData.append('TitleEn', this.enTitleFormControl.value);
      formData.append('DescriptionAr', this.arDescFormControl.value);
      formData.append('DescriptionEn', this.enDescFormControl.value);
      formData.append('Image', this.fileToUpload);
      formData.append('name', 'Name');

      this.http.post(AppConfig.settings.apiServer.host + 'Advertisment/Add_Advertisment.php', formData,
        httpOptions)
        .subscribe(result => {
          response = <IResponse>result;
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
