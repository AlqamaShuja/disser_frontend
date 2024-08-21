import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCouponPageComponent } from './admin-coupon-page.component';

describe('AdminCouponPageComponent', () => {
  let component: AdminCouponPageComponent;
  let fixture: ComponentFixture<AdminCouponPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCouponPageComponent]
    });
    fixture = TestBed.createComponent(AdminCouponPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
