import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TOBEDELETEComponent } from './tobedelete.component';

describe('TOBEDELETEComponent', () => {
  let component: TOBEDELETEComponent;
  let fixture: ComponentFixture<TOBEDELETEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TOBEDELETEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TOBEDELETEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
