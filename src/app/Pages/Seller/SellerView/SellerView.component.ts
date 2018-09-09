import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerService } from '../../../Services/Seller.service';
import { IResponse, IRequest, ISeller, ICart } from '../../../models/Response';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import swal from 'sweetalert2';
declare const google: any;
@Component({
  selector: 'app-seller-view',
  templateUrl: './SellerView.component.html',
  styleUrls: ['./SellerView.component.css']
})
export class SellerViewComponent implements OnInit {
  ennameFormControl = new FormControl('', [
    Validators.required,
  ]);
  arnameFormControl = new FormControl('', [
    Validators.required,
  ]);
  phoneFormControl = new FormControl('', [
    Validators.required,
  ]);
  addressFormControl = new FormControl('', [
    Validators.required,
  ]);
  form: FormGroup;
  seller: ISeller;
  ID: Number;
  markers: Array<any>;
  constructor(private _sellerService: SellerService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
  });
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      enname: ['', Validators.required],
      arname: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });

     const myLatlng = new google.maps.LatLng('-33.8688', '151.2195');
    const mapOptions = {
        zoom: 6,
        center: myLatlng,
        scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
    };

    const map = new google.maps.Map(document.getElementById('regularMap'), mapOptions);

    // Create the search box and link it to the UI element.
    // const input = document.getElementById('pac-input');
    // const searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    // map.addListener('bounds_changed', function() {
    //   searchBox.setBounds(map.getBounds());
    // });
    // let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        // searchBox.addListener('places_changed', function() {
        //   const places = searchBox.getPlaces();

        //   if (places.length === 0) {
        //     return;
        //   }

        //   // Clear out the old markers.
        //   // tslint:disable-next-line:no-shadowed-variable
        //   this.markers.forEach(function(marker: any) {
        //     marker.setMap(null);
        //   });
        //   this.markers = [];

        //   // For each place, get the icon, name and location.
        //   const bounds = new google.maps.LatLngBounds();
        //   places.forEach(function(place) {
        //     if (!place.geometry) {
        //       console.log('Returned place contains no geometry');
        //       return;
        //     }
        //     const icon = {
        //       url: place.icon,
        //       size: new google.maps.Size(71, 71),
        //       origin: new google.maps.Point(0, 0),
        //       anchor: new google.maps.Point(17, 34),
        //       scaledSize: new google.maps.Size(25, 25)
        //     };

        //     // Create a marker for each place.
        //     this.markers.push(new google.maps.Marker({
        //       map: map,
        //       icon: icon,
        //       title: place.name,
        //       position: place.geometry.location
        //     }));

        //     if (place.geometry.viewport) {
        //       // Only geocodes have viewport.
        //       bounds.union(place.geometry.viewport);
        //     } else {
        //       bounds.extend(place.geometry.location);
        //     }
        //   });
        //   map.fitBounds(bounds);
        // });
       // google.maps.event.addDomListener(map, 'click', function() {this.setMarker(event); });

    if (this.ID !== undefined && this.ID !== 0) {
      this._sellerService.getSellerDetails({SellerId: this.ID}).subscribe(result => {
        const seller: ISeller = <ISeller>((<IResponse>result).SellerInfo);
         this.ennameFormControl.setValue(seller.Name);
         this.phoneFormControl.setValue(seller.Phone);
         this.addressFormControl.setValue(seller.Address);
         map.setCenter(new google.maps.LatLng(seller.Longitude, seller.Latitude));
         // tslint:disable-next-line:no-shadowed-variable
         if (this.markers !== undefined) {
         this.markers.forEach(function(marker: any) {
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
    // if (!this.form.valid) {
    // return;
    // }
   let response: any ;
    if (this.ID !== undefined && this.ID !== 0) {
// tslint:disable-next-line:max-line-length
this._sellerService.updateSellers({SellerId: this.ID, NameAr: this.arnameFormControl.value, NameEn: this.ennameFormControl.value, Phone: this.phoneFormControl.value
// tslint:disable-next-line:max-line-length
, Address: this.addressFormControl.value, Latitude: this.markers[0].position.lat() , Longitude: this.markers[0].position.lng() }).subscribe(result => {
  response = <IResponse>result ;
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
      this._sellerService.addSellers({NameAr: this.arnameFormControl.value, NameEn: this.ennameFormControl.value, Phone: this.phoneFormControl.value
        // tslint:disable-next-line:max-line-length
        , Address: this.addressFormControl.value, Latitude: this.markers[0].position.lat() , Longitude: this.markers[0].position.long() }).subscribe(result => {
          response = <IResponse>result ;
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
