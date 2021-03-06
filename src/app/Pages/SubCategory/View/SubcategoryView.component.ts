import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryService } from '../../../Services/SubCategory.service';
import { CategoryService } from '../../../Services/CategoryService.service';
import { IResponse, ISubCategory, ICategory } from '../../../models/Response';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { AppConfig } from '../../../app.config';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-seller-view',
  templateUrl: './SubcategoryView.component.html',
  styleUrls: ['./SubcategoryView.component.css']
})
export class SubcategoryViewComponent implements OnInit {
  ennameFormControl: FormControl;
  arnameFormControl: FormControl;
  mainCategoryControl: FormControl;
  form: FormGroup;
  ID: string;
  CategortyID: string;
  category: ISubCategory;
  categories: ICategory[];
  mainCategory: string;
  fileToUpload: File = null;
  isSubmitted: boolean;
  elementImage: string;
  imagePath: string;
  upluadimage: any;
  // tslint:disable-next-line:max-line-length
  constructor(
    private _subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
      this.CategortyID = params['CategoryID'];
      this.form = new FormGroup({});
      this.ennameFormControl = new FormControl('', [Validators.required]);
      this.arnameFormControl = new FormControl('', [Validators.required]);
      this.mainCategoryControl = new FormControl('', [Validators.required]);
    });

    this.form.addControl('ennameFormControl', this.ennameFormControl);
    this.form.addControl('arnameFormControl', this.arnameFormControl);
    this.form.addControl('mainCategoryControl', this.mainCategoryControl);
  }

  ngOnInit() {
    if (this.CategortyID === undefined) {
      this.CategortyID = '0';
    }
    this.categoryService.getCategories().subscribe(response => {
      this.categories = (<IResponse>response).Categories;
      if (this.ID) {
        this.mainCategoryControl.setValue(
          this.categories.find(cat => cat.ID === this.CategortyID).ID
        );
      }
    });

    if (this.ID !== undefined) {
      this._subCategoryService
        .getSupCategories({ MainCategoryId: this.CategortyID })
        .subscribe(result => {
          this.category = (<IResponse>result).SubCategories.find(
            x => x.ID === this.ID
          );
          this.ennameFormControl.setValue(this.category.NameEn);
          this.arnameFormControl.setValue(this.category.NameAr);
          this.elementImage = this.category.Image;
          this.imagePath = AppConfig.settings.apiServer.subCategoryimagepath;
          this.mainCategoryControl.setValue(this.category.CategoryId);
        });
    }
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
      formData.append('CategoryId', this.mainCategoryControl.value);
      formData.append('SubCategoryName_Ar', this.arnameFormControl.value);
      formData.append('SubCategoryName_En', this.ennameFormControl.value);
      if(this.fileToUpload)
      formData.append('image', this.fileToUpload);
      formData.append('SubCategoryId', this.ID);
      this.http
        .post(
          AppConfig.settings.apiServer.host + 'Category/EditSubCategory.php',
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
      // this.SubCategoryService.addSupCategory
      //   ({
      //     CategoryId: this.mainCategoryControl.value, CategoryName_Ar: this.arnameFormControl.value,
      //     CategoryName_En: this.ennameFormControl.value
      //   })
      const httpOptions = {
        headers: new HttpHeaders()
          .append(
            'Authorization',
            AppConfig.settings.apiServer.AuthorizationToken
          )
          .append('Accept-Language', 'En')
      };
      const formData: FormData = new FormData();
      formData.append('CategoryId', this.mainCategoryControl.value);
      formData.append('SubCategoryName_Ar', this.arnameFormControl.value);
      formData.append('SubCategoryName_En', this.ennameFormControl.value);
      formData.append('image', this.fileToUpload);
      this.http
        .post(
          AppConfig.settings.apiServer.host + 'Category/AddNewSubCategory.php',
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

  previewImage(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.onload = (ev: FileReaderEvent) => {
      this.upluadimage = ev.target.result;
    };
    reader.readAsDataURL(files.item(0));
  }
}
