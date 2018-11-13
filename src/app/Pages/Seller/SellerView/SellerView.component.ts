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
  //areaFormControl: FormControl;
  isSubitted: boolean;
  //map: any;
  areas: IArea[];
  //#endregion
  //#region constructor
  constructor(private araeService: AreaService, private _sellerService: SellerService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
    });
    this.form = new FormGroup({});
    //this.areaFormControl = new FormControl();
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

  changeaddress(results, status) {
    debugger;
    if (status === 'OK') {
      if (results[0]) {
        (document.getElementById("Address") as HTMLTextAreaElement).value = results[0].formatted_address;
        //document.getElementById('Address').value = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  }
  ngOnInit() {
    // this.araeService.getAreas().subscribe(response => {
    //   this.areas = ((<IResponse>response).Areas);
    // });
    //#region controls
    this.form.addControl('ennameFormControl', this.ennameFormControl);
    this.form.addControl('arnameFormControl', this.arnameFormControl);
    this.form.addControl('phoneFormControl', this.phoneFormControl);
    this.form.addControl('addressFormControl', this.addressFormControl);
    //this.form.addControl('addressFormControl', this.areaFormControl);
    //#endregion
    //#region map
    const myLatlng = new google.maps.LatLng('31.9454', '35.9284');
    const mapOptions = {
      zoom: 17,
      center: myLatlng,
      scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
    };

    var map = new google.maps.Map(document.getElementById('regularMap'), mapOptions);
    var card = document.getElementById('pac-card');
        var input = document.getElementById('pac-input');
        var types = document.getElementById('type-selector');
        var strictBounds = document.getElementById('strict-bounds-selector');

        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

        var autocomplete = new google.maps.places.Autocomplete(input);
        var geocoder = new google.maps.Geocoder;
        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo('bounds', map);

        // Set the data fields to return when the user selects a place.
        autocomplete.setFields(
            ['address_components', 'geometry', 'icon', 'name']);

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        // var marker = new google.maps.Marker({
        //   map: map,
        //   anchorPoint: new google.maps.Point(0, -29),
        //   draggable: true
        // });
         this.marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29),
          draggable: true
         });

        autocomplete.addListener('place_changed', (e) => {
          infowindow.close();
          this.marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert('No details available for input: \'' + place.name + "'");
            return;
          }
          // If the place has a geometry, then present it on a map.
          // if (place.geometry.viewport) {
          //   map.fitBounds(place.geometry.viewport);
          // } else {
            map.setCenter(place.geometry.location);
          //}
          map.setZoom(17); // Why 17? Because it looks good.
          this.marker.setPosition(place.geometry.location);
          this.marker.setVisible(true);
          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }
          this.addressFormControl.setValue(address);
          //document.getElementById('Address').value = address;
          infowindowContent.children['place-icon'].src = place.icon;
          // infowindowContent.children['place-name'].textContent = place.name;
          // infowindowContent.children['place-address'].textContent = address;
          //infowindow.open(map, marker);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, types) {
          var radioButton = document.getElementById(id);
          radioButton.addEventListener('click', function() {
            autocomplete.setTypes(types);
          });
        }

    google.maps.event.addListener(map, 'click', (e) => {
      map.setCenter(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()));
      var markerPsoition = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
      this.marker.setPosition(markerPsoition);
      geocoder.geocode({'location': markerPsoition}, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            (document.getElementById("Address") as HTMLTextAreaElement).value = results[0].formatted_address;
            //document.getElementById('Address').value = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    });

    google.maps.event.addListener(this.marker, 'dragend', (e) => {
      map.setCenter(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()));
      var markerPsoition = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
      geocoder.geocode({'location': markerPsoition}, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            (document.getElementById('Address') as HTMLTextAreaElement).value = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    });

    //#endregion
    //#region  fill the controllers
    if (this.ID !== undefined && this.ID !== 0) {
      this._sellerService.getSellerDetails({ SellerId: this.ID }).subscribe(result => {
        const seller: ISeller = <ISeller>((<IResponse>result).SellerInfo);
        this.ennameFormControl.setValue(seller.NameEn);
        this.arnameFormControl.setValue(seller.NameAr === undefined ? seller.Name : seller.NameAr);
        this.phoneFormControl.setValue(seller.Phone);
        this.addressFormControl.setValue(seller.Address);
        map.setCenter(new google.maps.LatLng(seller.Latitude, seller.Longitude));
        var markerPsoition = new google.maps.LatLng(seller.Latitude, seller.Longitude);
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
    debugger;
    if (this.ID !== undefined && this.ID !== 0) {
      this._sellerService.updateSellers({
        //areaID: this.areaFormControl.value,
        SellerId: this.ID, NameAr: this.arnameFormControl.value, NameEn: this.ennameFormControl.value, Phone: this.phoneFormControl.value
        , Address: (document.getElementById('Address') as HTMLTextAreaElement).value, Latitude: this.marker.position.lat(), Longitude: this.marker.position.lng()
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
        //areaID: this.areaFormControl.value,
        NameAr: this.arnameFormControl.value, NameEn: this.ennameFormControl.value, Phone: this.phoneFormControl.value
        , Address: (document.getElementById("Address") as HTMLTextAreaElement).value, Latitude: this.marker.position.lat(), Longitude: this.marker.position.lng()
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
