import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderPriceByDateComponent } from './admin-order-price-by-date.component';

describe('AdminOrderPriceByDateComponent', () => {
  let component: AdminOrderPriceByDateComponent;
  let fixture: ComponentFixture<AdminOrderPriceByDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrderPriceByDateComponent]
    });
    fixture = TestBed.createComponent(AdminOrderPriceByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
