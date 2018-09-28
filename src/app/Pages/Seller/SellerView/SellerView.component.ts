import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerService } from '../../../Services/Seller.service';
import { AreaService } from '../../../Services/Area.service';
import { IResponse, IRequest, ISeller, ICart, IArea } from '../../../models/Response';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
declare const google: any;
@Component({
  selector: 'app-seller-view',
  templateUrl: './SellerView.component.html',
  styleUrls: ['./SellerView.component.css']
})
export class SellerViewComponent implements OnInit {
  //#region Decleration
  form: FormGroup;
  seller: ISeller;
  ID: Number;
  marker: any;
  ennameFormControl: FormControl;
  arnameFormControl: FormControl;
  phoneFormControl: FormControl;
  addressFormControl: FormControl;
  locationFormControl: FormControl;
  areaFormControl: FormControl;
  isSubitted: boolean;
  map: any;
  areas: IArea[];
  //#endregion
  //#region constructor
  constructor(private araeService: AreaService, private _sellerService: SellerService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
    });
    this.form = new FormGroup({});
    this.areaFormControl = new FormControl();
    this.ennameFormControl = new FormControl('', [
      Validators.required,
    ]);

    this.locationFormControl = new FormControl();

    this.arnameFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.phoneFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.addressFormControl = new FormControl('', [
      Validators.required,
    ]);
  }
  //#endregion
  //#region Init
  ngOnInit() {
    this.araeService.getAreas().subscribe(response => {
      this.areas = ((<IResponse>response).Areas);
    })
    //#region controls
    this.form.addControl('ennameFormControl', this.ennameFormControl);
    this.form.addControl('arnameFormControl', this.arnameFormControl);
    this.form.addControl('phoneFormControl', this.phoneFormControl);
    this.form.addControl('addressFormControl', this.addressFormControl);
    this.form.addControl('addressFormControl', this.areaFormControl);
    //#endregion
    //#region map
    const myLatlng = new google.maps.LatLng('31.9454', '35.9284');
    const mapOptions = {
      zoom: 6,
      center: myLatlng,
      scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
    };

    this.map = new google.maps.Map(document.getElementById('regularMap'), mapOptions);
    this.marker = new google.maps.Marker({
      map: this.map,
      title: '',
      position: new google.maps.LatLng('31.9454', '35.9284'),
      draggable: true
    });

    google.maps.event.addListener(this.map, 'click', (e) => {
      this.map.setCenter(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()));
      var markerPsoition = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng())
      this.marker.setPosition(markerPsoition);
    });

    google.maps.event.addListener(this.marker, 'dragend', (e) => {
      this.map.setCenter(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()));
    });

    //#endregion
    //#region  fill the controllers
    if (this.ID !== undefined && this.ID !== 0) {
      this._sellerService.getSellerDetails({ SellerId: this.ID }).subscribe(result => {
        const seller: ISeller = <ISeller>((<IResponse>result).SellerInfo);
        this.ennameFormControl.setValue(seller.Name);
        this.arnameFormControl.setValue(seller.NameAR == undefined ? seller.Name : seller.Name);
        this.phoneFormControl.setValue(seller.Phone);
        this.addressFormControl.setValue(seller.Address);
        this.map.setCenter(new google.maps.LatLng(seller.Latitude, seller.Longitude));
        var markerPsoition = new google.maps.LatLng(seller.Latitude, seller.Longitude)
        this.marker.setPosition(markerPsoition);
      });
    }
    //#endregion
  }
  //#endregion
  addUpdateSeller() {
    if (this.form.status == "INVALID")
      return;
    let response: any;
    if (this.ID !== undefined && this.ID !== 0) {
      this._sellerService.updateSellers({
        areaID: this.areaFormControl.value,
        SellerId: this.ID, NameAr: this.arnameFormControl.value, NameEn: this.ennameFormControl.value, Phone: this.phoneFormControl.value
        , Address: this.addressFormControl.value, Latitude: this.marker.position.lat(), Longitude: this.marker.position.lng()
      }).subscribe(result => {
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
      this._sellerService.addSellers({
        areaID: this.areaFormControl.value,
        NameAr: this.arnameFormControl.value, NameEn: this.ennameFormControl.value, Phone: this.phoneFormControl.value
        , Address: this.addressFormControl.value, Latitude: this.marker.position.lat(), Longitude: this.marker.position.lng()
      }).subscribe(result => {
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
