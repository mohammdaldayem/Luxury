import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridDeletbtnComponent } from './GridDeletbtn.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  exports: [GridDeletbtnComponent],
  declarations: [GridDeletbtnComponent],
  bootstrap: [GridDeletbtnComponent]
})
export class GridDeletbtnModule { }
