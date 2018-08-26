/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellerViewComponent } from './SellerView.component';

describe('SellerViewComponent', () => {
  let component: SellerViewComponent;
  let fixture: ComponentFixture<SellerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
