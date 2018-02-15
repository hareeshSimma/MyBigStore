import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalitemslistComponent } from './totalitemslist.component';

describe('TotalitemslistComponent', () => {
  let component: TotalitemslistComponent;
  let fixture: ComponentFixture<TotalitemslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalitemslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalitemslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
