import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DeliveryService } from '../../../Services/Delivery.service';
import { IResponse } from '../../../models/Response';
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './Add.component.html',
  styleUrls: ['./Add.component.css']
})
export class Addomponent implements OnInit {
  form: FormGroup;
  deliveryValueFormControl: FormControl;
  isSubmitted: boolean;

  constructor(private _deliveryService: DeliveryService) {
    this.deliveryValueFormControl = new FormControl('', [Validators.required]);

    this.form = new FormGroup({});
  }
  ngOnInit() {
    this._deliveryService.getDeliveryFee().subscribe(response => {
      this.deliveryValueFormControl.setValue((<IResponse>response).DeliveryFee.Value);
    });
  }

  Add() {
    this.isSubmitted = true;
    if (this.form.status === 'INVALID') {
      return;
    }

    this._deliveryService
      .Add({ DeliveryFee : this.deliveryValueFormControl.value })
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
