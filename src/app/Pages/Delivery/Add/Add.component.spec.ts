/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Addomponent } from './Add.component';

describe('Addomponent', () => {
  let component: Addomponent;
  let fixture: ComponentFixture<Addomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Addomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Addomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
