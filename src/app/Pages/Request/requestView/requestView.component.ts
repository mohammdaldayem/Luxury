import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../Services/request.service';
import { IResponse, IRequest, ISeller, ICart } from '../../../models/Response';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import swal from 'sweetalert2';

declare const google: any;
@Component({
  selector: 'app-request-view',
  templateUrl: './requestView.component.html',
  styleUrls: ['./requestView.component.css']
})
export class RequestViewComponent implements OnInit {

  request: IRequest;
  ID: Number;
  Cart: ICart[];
  SelectedStatus: any;
  Statuses = [{ID: 1, NameEN: 'Pending'}, {ID: 2, NameEN: 'In Progress'}, {ID: 3, NameEN: 'Completed'}, {ID: 4, NameEN: 'Declined'}];
  constructor(private _requestService: RequestService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
  });
  }
  ngOnInit() {
    this._requestService.getRequestDetails({RequestId: this.ID}).subscribe(result => {
      this.request = <IRequest>((<IResponse>result).RequestInfo);
      this.Cart = (<IResponse>result).Cart;
      console.log(this.request);
      const myLatlng = new google.maps.LatLng(this.request.Latitude, this.request.Longitude);
    const mapOptions = {
        zoom: 4,
        center: myLatlng,
        scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
    };
    const map = new google.maps.Map(document.getElementById('regularMap'), mapOptions);
    const marker = new google.maps.Marker({
        position: myLatlng,
        title: 'Request Location !'
    });
    marker.setMap(map);
    });
  }
  showconfermationmessage(Reqid: number, statusid: number) {
    this.SelectedStatus = statusid;
  }
  ChangeRequestStatus() {
    this._requestService.changeRequestStatus({RequestId: this.request.ID, StatusId: this.SelectedStatus}).subscribe(result => {
      const response = <IResponse>result;
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
