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
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { ItemService } from '../../../Services/Item.service';
import { SellerService } from '../../../Services/Seller.service';
import { CategoryService } from '../../../Services/CategoryService.service';
import { SubCategoryService } from '../../../Services/SubCategory.service';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { ItemDescreptionComponent } from '../../../Popups/ItemDescreption/ItemDescreption.component';
import { AppConfig } from '../../../app.config';
import { ItemSizeComponent } from '../../../Popups/ItemSize/ItemSize.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-itemview',
  templateUrl: './ItemView.component.html',
  styleUrls: ['./ItemView.component.css']
})
export class ItemViewComponent implements OnInit {
  //#region Variable Decleration
  form: FormGroup;
  isSubmitted: boolean;
  ID: string;
  Sellers: ISeller[];
  Categories: ICategory[];
  SubCategories: ISubCategory[];
  Item: IItem = new IItem();
  itemImagePath: string = AppConfig.settings.apiServer.itemimagepath;
  itemColorsPath: string = AppConfig.settings.apiServer.itemcolorspath;
  addItemImages: File[];
  addItemColors: File[];
  Itemurls = [];
  Colorsurls = [];
  addItemColorImages: File[];
  displayedColumns: string[] = ['name', 'value','Actions'];
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
  HasDescription = new FormControl('', [Validators.required]);
  HasOptions = new FormControl('', [Validators.required]);
  //#endregion
  //#region Constructor
  constructor(
    public dialog: MatDialog,
    private itemService: ItemService,
    private sellerService: SellerService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    
    this.HasDescription.setValue('0');
    this.HasOptions.setValue('0');
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
    this.form = new FormGroup({});
    this.form.addControl('ennameFormControl', this.ennameFormControl);
    this.form.addControl('arnameFormControl', this.arnameFormControl);
    this.form.addControl('orginalPriceFormControl', this.orginalPriceFormControl);
    this.form.addControl('profitRatioFormControl', this.profitRatioFormControl);
    this.form.addControl('priceFormControl', this.priceFormControl);
    this.form.addControl('sellerDDLControl', this.sellerDDLControl);
    this.form.addControl('enTitleFormConcategoryDDLControltrol', this.categoryDDLControl);
    this.form.addControl('subCategoryDDLControl', this.subCategoryDDLControl);
    this.form.addControl('HasDescription', this.HasDescription);
    this.form.addControl('HasOptions', this.HasOptions);
  }
  //#endregion
  //#region Functions
  ngOnInit() {
    if (this.ID) {
      this.itemService.getItemDetails({ ItemId: this.ID }).subscribe(resault => {
        this.Item = (<IResponse>resault).ItemDetails;
        this.ennameFormControl.setValue(this.Item.ItemInfo.Name);
        this.arnameFormControl.setValue(this.Item.ItemInfo.Name);
        this.orginalPriceFormControl.setValue(this.Item.ItemInfo.OriginalPrice);
        this.profitRatioFormControl.setValue(this.Item.ItemInfo.ProfitRatio);
        this.priceFormControl.setValue(this.Item.ItemInfo.Price);
        this.sellerDDLControl.setValue(this.Item.ItemInfo.SellerId);
        this.HasDescription.setValue(this.Item.ItemInfo.HasDescription);
        this.HasOptions.setValue(this.Item.ItemInfo.HasOptions);
        this.categoryDDLControl.setValue(this.Item.ItemInfo.CategoryId);
        this.ItemDescdataSource = new MatTableDataSource<IItemDescription>(this.Item.ItemDescription);
        this.subCategoryService
      .getSupCategories({ MainCategoryId: this.categoryDDLControl.value })
      .subscribe(result => {
        this.SubCategories = (<IResponse>result).SubCategories;
        this.subCategoryDDLControl.setValue(this.Item.ItemInfo.SubCategoryId);
      });
      });
    }
  }

  addupdateItem() {
    this.isSubmitted = true;
    if (this.form.status === 'INVALID') {
      return;
    }
    const httpOptions = {
      headers: new HttpHeaders()
        .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
        .append('Accept-Language', 'En')
    };
    let response: any;
    if (this.ID) {
      const ItemInfoJSON: any = {};
      ItemInfoJSON.ItemId = this.ID;
      ItemInfoJSON.ItemData = [];
      ItemInfoJSON.ItemData.push({ NameEn: this.ennameFormControl.value });
      ItemInfoJSON.ItemData.push({ NameAr: this.arnameFormControl.value });
      ItemInfoJSON.ItemData.push({ OriginalPrice: this.orginalPriceFormControl.value });
      ItemInfoJSON.ItemData.push({ ProfitRatio: this.profitRatioFormControl.value });
      ItemInfoJSON.ItemData.push({ Price: this.priceFormControl.value });
      ItemInfoJSON.ItemData.push({ SellerId: this.sellerDDLControl.value });
      ItemInfoJSON.ItemData.push({ AreaId: 1 });
      ItemInfoJSON.ItemData.push({ CategoryId: this.categoryDDLControl.value });
      ItemInfoJSON.ItemData.push({ SubCategoryId: this.subCategoryDDLControl.value });
      ItemInfoJSON.ItemData.push({ HasOptions: this.HasOptions.value });
      ItemInfoJSON.ItemData.push({ HasDescription: this.HasDescription.value });
      if (this.Item.ItemDescription) {
        ItemInfoJSON.ItemDescription = this.Item.ItemDescription;
      }
      ItemInfoJSON.ItemOptions = [];
      if (this.Item.ItemColors) {
        const ItemColorsobj: any = {};
        ItemColorsobj.ItemColors = this.Item.ItemColors;
        ItemInfoJSON.ItemOptions.push(ItemColorsobj);
      }
      if (this.Item.ItemSizes) {
        const ItemSizesobj: any = {};
        ItemSizesobj.ItemSizes = this.Item.ItemSizes;
        ItemInfoJSON.ItemOptions.push(ItemSizesobj);
      }
      const formData: FormData = new FormData();
      formData.append('ItemInfoJSON', JSON.stringify(ItemInfoJSON));
      if (this.addItemImages) {
        this.addItemImages.forEach(element => {
          formData.append('image', element);
        });
      }
      if (this.addItemColors) {
        this.addItemColors.forEach(element => {
          formData.append('colorImage', element);
        });
      }
      this.http.post(AppConfig.settings.apiServer.host + 'Item/Edit_Item.php', formData,
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
    } else {
      const ItemInfoJSON: any = {};
      ItemInfoJSON.ItemData = [];
      ItemInfoJSON.ItemData.push({ NameEn: this.ennameFormControl.value });
      ItemInfoJSON.ItemData.push({ NameAr: this.arnameFormControl.value });
      ItemInfoJSON.ItemData.push({ OriginalPrice: this.orginalPriceFormControl.value });
      ItemInfoJSON.ItemData.push({ ProfitRatio: this.profitRatioFormControl.value });
      ItemInfoJSON.ItemData.push({ Price: this.priceFormControl.value });
      ItemInfoJSON.ItemData.push({ SellerId: this.sellerDDLControl.value });
      ItemInfoJSON.ItemData.push({ AreaId: 1 });
      ItemInfoJSON.ItemData.push({ CategoryId: this.categoryDDLControl.value });
      ItemInfoJSON.ItemData.push({ SubCategoryId: this.subCategoryDDLControl.value });
      ItemInfoJSON.ItemData.push({ HasOptions: this.HasOptions.value });
      ItemInfoJSON.ItemData.push({ HasDescription: this.HasDescription.value });
      if (this.Item.ItemDescription) {
        ItemInfoJSON.ItemDescription = this.Item.ItemDescription;
      }
      ItemInfoJSON.ItemOptions = [];
      if (this.addItemImages) {
        const ItemColorsobj: any = {};
        ItemColorsobj.ItemColors = [];
        if (this.addItemColors) {
          this.addItemColors.forEach(element => {
            ItemColorsobj.ItemColors.push({ NameAr: element.name, NameEn: element.name, ColorImage: element.name });
          });
        }
        ItemInfoJSON.ItemOptions.push(ItemColorsobj);
      }
      if (this.Item.ItemSizes) {
        const ItemSizesobj: any = {};
        ItemSizesobj.ItemSizes = this.Item.ItemSizes;
        ItemInfoJSON.ItemOptions.push(ItemSizesobj);
      }
      const formData: FormData = new FormData();
      formData.append('ItemInfoJSON', JSON.stringify(ItemInfoJSON));
      if (this.addItemImages) {
        this.addItemImages.forEach(element => {
          formData.append('image[]', element);
        });
      }
      if (this.addItemColors) {
        this.addItemColors.forEach(element => {
          formData.append('colorImage[]', element);
        });
      }
      this.http.post(AppConfig.settings.apiServer.host + 'Item/Add_Item.php', formData,
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

  changePrice() {
    if (
      this.orginalPriceFormControl.value &&
      this.profitRatioFormControl.value
    ) {
      this.priceFormControl.setValue(
        Number(this.orginalPriceFormControl.value) +
        Number(this.profitRatioFormControl.value)
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
    debugger
    const dialogRef = this.dialog.open(ItemDescreptionComponent, {
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!this.Item.ItemDescription) {
          this.Item.ItemDescription = [];
        }
        this.Item.ItemDescription.push({ ID: '0', Name: result.name, Value: result.value, Deleted: '' });
        this.ItemDescdataSource = new MatTableDataSource<IItemDescription>(this.Item.ItemDescription);
      }
    });
  }
  addSizeItem() {
    const dialogRef = this.dialog.open(ItemSizeComponent, {
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!this.Item.ItemSizes) {
          this.Item.ItemSizes = [];
        }
        this.Item.ItemSizes.push({ ID: '0', SizeValue: result.size, Deleted: '' });
      }
    });
  }
  onSelectFile(files: FileList) {
    if (files && files[0]) {
      const filesAmount = files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        if (!this.Item.ItemImages) {
          this.Item.ItemImages = [];
        }
        if (!this.addItemImages) {
          this.addItemImages = [];
        }
        // tslint:disable-next-line:no-shadowed-variable
        // this.Item.ItemImages.push({ID: '0', Image: files[i].name} as IItemImage);
        this.addItemImages.push(files[i]);
        reader.onload = (ev: FileReaderEvent) => {
          this.Itemurls.push(ev.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }
  onSelectColor(files: FileList) {
    if (files && files[0]) {
      const filesAmount = files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        if (!this.Item.ItemColors) {
          this.Item.ItemColors = [];
        }
        if (!this.addItemColors) {
          this.addItemColors = [];
        }
        // tslint:disable-next-line:no-shadowed-variable
        // this.Item.ItemImages.push({ID: '0', Image: files[i].name} as IItemImage);
        this.addItemColors.push(files[i]);
        reader.onload = (ev: FileReaderEvent) => {
          this.Colorsurls.push(ev.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }
  deleteItemImage(index: number, event: Event) {
    event.preventDefault();
    this.addItemImages.splice(index, 1);
    this.Itemurls.splice(index, 1);
  }
  deleteItemImagefromobj(index: number, event: any) {
    event.preventDefault();
    this.Item.ItemImages[index].Deleted = '1';
  }
  deleteItemColor(index: number, event: Event) {
    event.preventDefault();
    this.addItemColors.splice(index, 1);
    this.Colorsurls.splice(index, 1);
  }
  deleteItemColorfromobj(index: number, event: any) {
    event.preventDefault();
    this.Item.ItemColors[index].Deleted = '1';
  }
  deleteItemSize(index: number, event: any) {
    event.preventDefault();
    if (this.Item.ItemSizes[index].ID === '0') {
      this.Item.ItemSizes.splice(index, 1);
    } else {
      this.Item.ItemSizes[index].Deleted = '1';
    }
  }
  deleteItemDescfromobj(index: number, event: any) {
    debugger;
    event.preventDefault();
    if (this.Item.ItemDescription[index].ID === '0') {
      this.Item.ItemDescription.splice(index, 1);
    } else {
      this.Item.ItemDescription[index].Deleted = '1';
    }
    this.ItemDescdataSource = new MatTableDataSource<IItemDescription>(this.Item.ItemDescription.filter(x =>!x.Deleted || x.Deleted === '0' ));
  }
}
//#endregion
