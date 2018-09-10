import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryService } from '../../../Services/SubCategory.service';
import { CategoryService } from '../../../Services/CategoryService.service';
import { IResponse, ISubCategory, ICategory } from '../../../models/Response';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';

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
  constructor(private SubCategoryService: SubCategoryService, private categoryService: CategoryService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
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
      this.SubCategoryService.addSupCategory
        ({
          CategoryId: this.mainCategoryControl.value, CategoryName_Ar: this.arnameFormControl.value,
          CategoryName_En: this.ennameFormControl.value
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
  }
  addUpdateSubCategory() {
    debugger;
    if (this.ID !== undefined) {
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
    } else {
      this.SubCategoryService.addSupCategory
        ({
          CategoryId: this.CategortyID, CategoryName_Ar: this.arnameFormControl.value,
          CategoryName_En: this.ennameFormControl.value
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
  }

}
