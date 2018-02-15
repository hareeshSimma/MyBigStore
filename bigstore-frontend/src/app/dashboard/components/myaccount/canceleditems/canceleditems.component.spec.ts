import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceleditemsComponent } from './canceleditems.component';

describe('CanceleditemsComponent', () => {
  let component: CanceleditemsComponent;
  let fixture: ComponentFixture<CanceleditemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceleditemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceleditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
