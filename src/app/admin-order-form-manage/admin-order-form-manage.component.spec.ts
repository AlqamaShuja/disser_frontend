import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderFormManageComponent } from './admin-order-form-manage.component';

describe('AdminOrderFormManageComponent', () => {
  let component: AdminOrderFormManageComponent;
  let fixture: ComponentFixture<AdminOrderFormManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrderFormManageComponent]
    });
    fixture = TestBed.createComponent(AdminOrderFormManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
