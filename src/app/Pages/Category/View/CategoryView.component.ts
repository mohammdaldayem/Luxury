import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../Services/CategoryService.service';
import { IResponse, ICategory } from '../../../models/Response';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../../../app.config';

@Component({
  selector: 'app-seller-view',
  templateUrl: './CategoryView.component.html',
  styleUrls: ['./CategoryView.component.css']
})

export class CategoryViewComponent implements OnInit {
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
  category: ICategory;
  fileToUpload: File = null;
  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private formBuilder: FormBuilder, 
    private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      enname: ['', Validators.required],
      arname: ['', Validators.required]
    });

    if (this.ID !== undefined) {
      this.categoryService.getCategories().subscribe(response => {
        this.category = ((<IResponse>response).Categories).find(category => category.ID === this.ID);
        this.ennameFormControl.setValue(this.category.Name);
        this.arnameFormControl.setValue(this.category.Name); // to be chanege when feedback come from back end
      });
    }
  }
  previewImage(files: FileList) {
    this.fileToUpload = files.item(0);
  }
addUpdate() {

  if (this.ID) {
    this.categoryService.updateCategory
    ({
      CategoryId: this.ID, CategoryName_Ar: this.arnameFormControl.value,
      CategoryName_En: this.ennameFormControl.value,
      image: this.fileToUpload,
      name: this.fileToUpload.name
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
  } else {
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
     formData.append('CategoryName_Ar', this.arnameFormControl.value);
     formData.append('CategoryName_En', this.ennameFormControl.value);
     formData.append('image', this.fileToUpload);
     this.http.post( AppConfig.settings.apiServer.host + 'Category/MainCategories.php', formData,
     httpOptions)
    // this.categoryService.addCategory
    //  ({
    //    CategoryName_Ar: this.arnameFormControl.value,
    //    CategoryName_En: this.ennameFormControl.value,
    //    image: this.fileToUpload,
    //    name: this.fileToUpload.name
    //  })
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
