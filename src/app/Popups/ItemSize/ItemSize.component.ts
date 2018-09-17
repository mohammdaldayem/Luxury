import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IItemSize } from '../../models/Response';


@Component({
  selector: 'app-itemsize',
  templateUrl: './ItemSize.component.html',
  styleUrls: ['./ItemSize.component.css']
})
export class ItemSizeComponent implements OnInit {
//#region Variable Decleration
itemSize: IItemSize;
//#endregion
//#region Validation
sizeFormControl = new FormControl('', [
  Validators.required,
]);
//#endregion
  constructor(private dialogRef: MatDialogRef<ItemSizeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IItemSize) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onOkClick(): void {
    this.dialogRef.close({size: this.sizeFormControl.value});
  }
}
