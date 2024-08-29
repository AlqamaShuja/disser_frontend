import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSamplesListComponent } from './admin-samples-list.component';

describe('AdminSamplesListComponent', () => {
  let component: AdminSamplesListComponent;
  let fixture: ComponentFixture<AdminSamplesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSamplesListComponent]
    });
    fixture = TestBed.createComponent(AdminSamplesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
