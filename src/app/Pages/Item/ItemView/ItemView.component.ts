import { Component, OnInit } from '@angular/core';
import {
  IResponse,
  ISubCategory,
  ICategory,
  IItem,
  IItemInfo,
  IItemImage,
  IItemDescription,
  ISeller
} from '../../../models/Response';
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
import { ItemService } from '../../../Services/Item.service';
import { SellerService } from '../../../Services/Seller.service';
import { CategoryService } from '../../../Services/CategoryService.service';
import { SubCategoryService } from '../../../Services/SubCategory.service';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { ItemDescreptionComponent } from '../../../Popups/ItemDescreption/ItemDescreption.component';
import { AppConfig } from '../../../app.config';
@Component({
  selector: 'app-itemview',
  templateUrl: './ItemView.component.html',
  styleUrls: ['./ItemView.component.css']
})
export class ItemViewComponent implements OnInit {
  //#region Variable Decleration
  form: FormGroup;
  ID: string;
  Sellers: ISeller[];
  Categories: ICategory[];
  SubCategories: ISubCategory[];
  Item: IItem = new IItem();
  itemImagePath: string = AppConfig.settings.apiServer.itemimagepath;
  addItemImages: File[];
  Itemurls = [];
  addItemColorImages: File[];
  displayedColumns: string[] = [ 'name', 'value'];
  ItemDescdataSource: MatTableDataSource<IItemDescription>;
  //#endregion
  //#region  Validation
  ennameFormControl = new FormControl('', [Validators.required]);
  arnameFormControl = new FormControl('', [Validators.required]);
  orginalPriceFormControl = new FormControl('', [Validators.required]);
  profitRatioFormControl = new FormControl('', [Validators.required]);
  priceFormControl = new FormControl('', [Validators.required]);
  sellerDDLControl = new FormControl('', [Validators.required]);
  categoryDDLControl = new FormControl('', [Validators.required]);
  subCategoryDDLControl = new FormControl('', [Validators.required]);
  //#endregion
  //#region Constructor
  constructor(
    public dialog: MatDialog,
    private itemService: ItemService,
    private sellerService: SellerService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
    });

    this.sellerService
      .getSellers()
      .subscribe(Response => (this.Sellers = (<IResponse>Response).Sellers));
    this.categoryService
      .getCategories()
      .subscribe(
        Response => (this.Categories = (<IResponse>Response).Categories)
      );
    this.dialog.open(ItemDescreptionComponent, {
      width: '1000px'
    });
  }
  //#endregion
  //#region Functions
  ngOnInit() {
    this.form = this.formBuilder.group({
      enname: ['', Validators.required],
      arname: ['', Validators.required],
      orginalPrice: ['', Validators.required],
      profitRatio: ['', Validators.required],
      price: ['', Validators.required],
      sellerDDL: ['', Validators.required],
      categoryDDL: ['', Validators.required],
      subCategoryDDL: ['', Validators.required],
    });
    if (this.ID) {
      this.itemService.getItemDetails({ItemId: this.ID}).subscribe(resault => {
        this.Item = (<IResponse>resault).ItemDetails;
      });
      // load the item
    }
  }

  addupdateItem() {
    if (this.ID) {
    } else {
    }
  }

  changePrice() {
    if (
      this.orginalPriceFormControl.value &&
      this.profitRatioFormControl.value
    ) {
      this.priceFormControl.setValue(
        Number(this.orginalPriceFormControl.value) +
          Number(this.orginalPriceFormControl.value)
      );
    }
  }

  changeCategory() {
    this.subCategoryService
      .getSupCategories({ MainCategoryId: this.categoryDDLControl.value })
      .subscribe(result => {
        this.SubCategories = (<IResponse>result).SubCategories;
      });
  }

  addDescriptionItem() {
    const dialogRef = this.dialog.open(ItemDescreptionComponent, {
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!this.Item.ItemDescription) {
          this.Item.ItemDescription = [];
        }
        this.Item.ItemDescription.push({ID: '0', Name: result.name, Value: result.value });
        this.ItemDescdataSource = new MatTableDataSource<IItemDescription>(this.Item.ItemDescription);
      }
    });
  }
  onSelectFile(files: FileList) {
    if (files && files[0]) {
        const filesAmount = files.length;
        for (let i = 0; i < filesAmount; i++) {
                const reader = new FileReader();
                if (! this.Item.ItemImages) {
                  this.Item.ItemImages = [];
                }
                if (! this.addItemImages) {
                  this.addItemImages = [];
                }
                // tslint:disable-next-line:no-shadowed-variable
                // this.Item.ItemImages.push({ID: '0', Image: files[i].name} as IItemImage);
                this.addItemImages.push(files[i]);
                 reader.onload = (ev) => {
                    this.Itemurls.push(ev.target.result);
                 };
                reader.readAsDataURL(files[i]);
        }
    }
  }
}
//#endregion
