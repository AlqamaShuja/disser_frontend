import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRefrenceStyleComponent } from './admin-refrence-style.component';

describe('AdminRefrenceStyleComponent', () => {
  let component: AdminRefrenceStyleComponent;
  let fixture: ComponentFixture<AdminRefrenceStyleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRefrenceStyleComponent]
    });
    fixture = TestBed.createComponent(AdminRefrenceStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
