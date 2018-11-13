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
  ID: string;
  elementImage: string = null;
  fileToUpload: File = null;
  upluadimage: any;
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
    if (this.ID !== undefined && this.ID !== '') {
      this._advertismentService.getAdvertismentDetails({ AdvertismentId: this.ID }).subscribe(result => {
        const advertisment: IAdvertisment = <IAdvertisment>((<IResponse>result).ItemInfo);
        this.enTitleFormControl.setValue(advertisment.TitleEn);
        this.arTitleFormControl.setValue(advertisment.TitleAr);
        this.enDescFormControl.setValue(advertisment.DescriptionEn);
        this.arDescFormControl.setValue(advertisment.DescriptionAr);
        this.elementImage = advertisment.Image;
        this.imagePath = AppConfig.settings.apiServer.advertimagepath;
      });
    }
  }
  previewImage(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.onload = (ev: FileReaderEvent) => {
      this.upluadimage = ev.target.result;
    };
    reader.readAsDataURL(files.item(0));
  }
  AddUpdateAdvertisment() {
    this.isSubmitted = true;
    if (this.form.status === 'INVALID' || !this.fileToUpload) {
      return;
    }
    let response: any;
    if (this.ID) {
      const httpOptions = {
        headers: new HttpHeaders()
          .append(
            'Authorization',
            AppConfig.settings.apiServer.AuthorizationToken
          )
          .append('Accept-Language', 'En')
      };
      const formData: FormData = new FormData();
      formData.append('AdvertismentId', this.ID);
      formData.append('TitleAr', this.arTitleFormControl.value);
      formData.append('TitleEn', this.enTitleFormControl.value);
      formData.append('DescriptionAr', this.arDescFormControl.value);
      formData.append('DescriptionEn', this.enDescFormControl.value);
      formData.append('image', this.fileToUpload);
      this.http
      .post(
        AppConfig.settings.apiServer.host + 'Advertisment/Edit_Advertisment.php',
        formData,
        httpOptions
      )
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
    } else {
      const httpOptions = {
        headers: new HttpHeaders()
          .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
          .append('Accept-Language', 'En')
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
