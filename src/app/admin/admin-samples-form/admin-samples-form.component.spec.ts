import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSamplesFormComponent } from './admin-samples-form.component';

describe('AdminSamplesFormComponent', () => {
  let component: AdminSamplesFormComponent;
  let fixture: ComponentFixture<AdminSamplesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSamplesFormComponent]
    });
    fixture = TestBed.createComponent(AdminSamplesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
