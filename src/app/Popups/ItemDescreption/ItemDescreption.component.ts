import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IItemDescription } from "../../models/Response";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ItemDescreption',
  templateUrl: './ItemDescreption.component.html',
  styleUrls: ['./ItemDescreption.component.css']
})
export class ItemDescreptionComponent implements OnInit {
  //#region Variable Decleration
  itemDescription: IItemDescription;
  //#endregion
  //#region Validation
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  valueFormControl = new FormControl('', [
    Validators.required,
  ]);
  //#endregion
  constructor(
    private dialogRef: MatDialogRef<ItemDescreptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IItemDescription) { }
  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
