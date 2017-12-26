import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UplodeproductsComponent } from './uplodeproducts.component';

describe('UplodeproductsComponent', () => {
  let component: UplodeproductsComponent;
  let fixture: ComponentFixture<UplodeproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UplodeproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UplodeproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
