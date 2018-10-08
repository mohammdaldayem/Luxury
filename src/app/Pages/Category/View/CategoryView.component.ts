import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../Services/CategoryService.service';
import { IResponse, ICategory } from '../../../models/Response';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../../../app.config';

@Component({
  selector: 'app-seller-view',
  templateUrl: './CategoryView.component.html',
  styleUrls: ['./CategoryView.component.css']
})
export class CategoryViewComponent implements OnInit {
  ennameFormControl: FormControl;
  arnameFormControl: FormControl;
  isSubmitted: boolean;
  form: FormGroup;
  ID: string;
  category: ICategory;
  fileToUpload: File = null;
  elementImage: string;
  imagePath: string;
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
    });
    this.form = new FormGroup({});

    this.ennameFormControl = new FormControl('', [Validators.required]);

    this.arnameFormControl = new FormControl('', [Validators.required]);

    this.form.addControl('ennameFormControl', this.ennameFormControl);
    this.form.addControl('arnameFormControl', this.arnameFormControl);
  }

  ngOnInit() {
    if (this.ID !== undefined) {
      this.categoryService.getCategories().subscribe(response => {
        this.category = (<IResponse>response).Categories.find(
          category => category.ID === this.ID
        );
        this.ennameFormControl.setValue(this.category.Name);
        this.arnameFormControl.setValue(this.category.Name); // to be chanege when feedback come from back end
        this.elementImage = this.category.Image;
        this.imagePath = AppConfig.settings.apiServer.categoryimagepath;
      });
    }
  }
  previewImage(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  addUpdate() {
    this.isSubmitted = true;
    if (this.form.status === 'INVALID' || (!this.ID && !this.fileToUpload)) {
      return;
    }

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
      formData.append('CategoryId', this.ID);
      formData.append('CategoryName_Ar', this.arnameFormControl.value);
      formData.append('CategoryName_En', this.ennameFormControl.value);
      formData.append('image', this.fileToUpload);
      this.http
        .post(
          AppConfig.settings.apiServer.host + 'Category/EditCategory.php',
          formData,
          httpOptions
        )
        .subscribe(result => {
          const response = <IResponse>result;
          if (response.success === true) {
            swal({
              title: 'Success',
              text: 'The transaction is succeeded',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              type: 'success'
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
    } else {
      const httpOptions = {
        headers: new HttpHeaders()
          .append(
            'Authorization',
            AppConfig.settings.apiServer.AuthorizationToken
          )
          .append('Accept-Language', 'En')
      };
      const formData: FormData = new FormData();
      formData.append('CategoryName_Ar', this.arnameFormControl.value);
      formData.append('CategoryName_En', this.ennameFormControl.value);
      formData.append('image', this.fileToUpload, this.fileToUpload.name);
      this.http
        .post(
          AppConfig.settings.apiServer.host + 'Category/AddNewCategory.php',
          formData,
          httpOptions
        )
        .subscribe(result => {
          const response = <IResponse>result;
          if (response.success === true) {
            swal({
              title: 'Success',
              text: 'The transaction is succeeded',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              type: 'success'
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
}
