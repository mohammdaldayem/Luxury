import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryService } from '../../../Services/SubCategory.service';
import { CategoryService } from '../../../Services/CategoryService.service';
import { IResponse, ISubCategory, ICategory } from '../../../models/Response';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { AppConfig } from '../../../app.config';

@Component({
  selector: 'app-seller-view',
  templateUrl: './SubcategoryView.component.html',
  styleUrls: ['./SubcategoryView.component.css']
})

export class SubcategoryViewComponent implements OnInit {
  ennameFormControl = new FormControl('', [
    Validators.required,
  ]);
  arnameFormControl = new FormControl('', [
    Validators.required,
  ]);
  mainCategoryControl = new FormControl('', [
    Validators.required,
  ]);

  form: FormGroup;
  ID: string;
  CategortyID: string;
  category: ISubCategory;
  categories: ICategory[];
  mainCategory: string;
  fileToUpload: File = null;

  constructor(private SubCategoryService: SubCategoryService, private categoryService: CategoryService, private route: ActivatedRoute, private formBuilder: FormBuilder,private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
      this.CategortyID = params['CategoryID'];
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      enname: ['', Validators.required],
      arname: ['', Validators.required]
    });

    this.categoryService.getCategories().subscribe(response => {
      this.categories = ((<IResponse>response).Categories)
      this.mainCategoryControl.setValue(this.categories.find(cat => cat.ID == this.CategortyID).ID);
    });

    if (this.ID !== undefined) {
      this.SubCategoryService.getSupCategories({ MainCategoryId: this.CategortyID }).subscribe(result => {
        this.category = ((<IResponse>result).SubCategories).find(x => x.ID == this.ID);
        this.ennameFormControl.setValue(this.category.Name);
        this.arnameFormControl.setValue(this.category.Name);
      });
    }
  }
  alertd() {
    if (this.ID) {
      this.mainCategoryControl.value
      debugger
      this.SubCategoryService.updateSupCategory
        ({
          CategoryId: this.mainCategoryControl.value, CategoryName_Ar: this.arnameFormControl.value,
          CategoryName_En: this.ennameFormControl.value, SubCategoryId: this.ID
        }).subscribe(result => {
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
    else {
      // this.SubCategoryService.addSupCategory
      //   ({
      //     CategoryId: this.mainCategoryControl.value, CategoryName_Ar: this.arnameFormControl.value,
      //     CategoryName_En: this.ennameFormControl.value
      //   })
        const httpOptions = {
          headers: new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
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
        this.http.post( AppConfig.settings.apiServer.host + 'Category/AddNewSubCategory.php', formData,
        httpOptions)
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
  }
}
