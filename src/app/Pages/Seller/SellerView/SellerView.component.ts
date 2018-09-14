import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerService } from '../../../Services/Seller.service';
import { IResponse, IRequest, ISeller, ICart } from '../../../models/Response';
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

  form: FormGroup;
  seller: ISeller;
  ID: Number;
  markers: Array<any>;
  ennameFormControl: FormControl;
  arnameFormControl: FormControl;
  phoneFormControl: FormControl;
  addressFormControl: FormControl;
  isSubitted: boolean;
  constructor(private _sellerService: SellerService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
    });
    this.form = new FormGroup({});
    this.ennameFormControl = new FormControl('', [
      Validators.required,
    ]);
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

  ngOnInit() {
    this.form.addControl('ennameFormControl', this.ennameFormControl);
    this.form.addControl('arnameFormControl', this.arnameFormControl);
    this.form.addControl('phoneFormControl', this.phoneFormControl);
    this.form.addControl('addressFormControl', this.addressFormControl);

    const myLatlng = new google.maps.LatLng('-33.8688', '151.2195');
    const mapOptions = {
      zoom: 6,
      center: myLatlng,
      scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
    };

    const map = new google.maps.Map(document.getElementById('regularMap'), mapOptions);

    if (this.ID !== undefined && this.ID !== 0) {
      this._sellerService.getSellerDetails({ SellerId: this.ID }).subscribe(result => {
        const seller: ISeller = <ISeller>((<IResponse>result).SellerInfo);
        this.ennameFormControl.setValue(seller.Name);
        this.phoneFormControl.setValue(seller.Phone);
        this.addressFormControl.setValue(seller.Address);
        map.setCenter(new google.maps.LatLng(seller.Longitude, seller.Latitude));
        // tslint:disable-next-line:no-shadowed-variable
        if (this.markers !== undefined) {
          this.markers.forEach(function (marker: any) {
            marker.setMap(null);
          });
        }
        this.markers = [];
        this.markers.push(new google.maps.Marker({
          map: map,
          title: '',
          position: new google.maps.LatLng(seller.Longitude, seller.Latitude),
          draggable: true
        }));

      });
    }
  }
  ongradend(marker) {
    this.seller.Latitude = marker.position.lat();
    this.seller.Longitude = marker.position.lng();
  }
  setMarker(event) {
    if (event !== undefined) {
      const myLatLng: any = event.latLng;
    }
    // var lat = myLatLng.lat();
    // var lng = myLatLng.lng();
  }
  addUpdateSeller() {
    var dsfsd = this.markers;
    debugger
    if (this.form.status == "INVALID")
      return;
    let response: any;
    if (this.ID !== undefined && this.ID !== 0) {
      // tslint:disable-next-line:max-line-length
      this._sellerService.updateSellers({
        SellerId: this.ID, NameAr: this.arnameFormControl.value, NameEn: this.ennameFormControl.value, Phone: this.phoneFormControl.value
        // tslint:disable-next-line:max-line-length
        , Address: this.addressFormControl.value, Latitude: this.markers[0].position.lat(), Longitude: this.markers[0].position.lng()
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
      // tslint:disable-next-line:max-line-length
      this._sellerService.addSellers({
        NameAr: this.arnameFormControl.value, NameEn: this.ennameFormControl.value, Phone: this.phoneFormControl.value
        // tslint:disable-next-line:max-line-length
        , Address: this.addressFormControl.value, Latitude: this.markers[0].position.lat(), Longitude: this.markers[0].position.long()
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
