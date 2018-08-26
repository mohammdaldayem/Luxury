import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-grid-delet-btn',
  templateUrl: './GridDeletbtn.component.html',
  styleUrls: ['./GridDeletbtn.component.css']
})
export class GridDeletbtnComponent {

  @Input() ID: number;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onConfirm: EventEmitter<number> = new EventEmitter<number>();
  // tslint:disable-next-line:no-unused-expression
  popoverTitle: String = 'Are you sure?';
  popoverMessage: String = 'Are you really <b>sure</b> you want to do this?';
  constructor() {
   }

  onConfirmclick() {
    this.onConfirm.emit(this.ID);
  }
}
