import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdetialsComponent } from './orderdetials.component';

describe('OrderdetialsComponent', () => {
  let component: OrderdetialsComponent;
  let fixture: ComponentFixture<OrderdetialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderdetialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
