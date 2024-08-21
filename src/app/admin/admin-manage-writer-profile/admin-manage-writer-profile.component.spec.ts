import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageWriterProfileComponent } from './admin-manage-writer-profile.component';

describe('AdminManageWriterProfileComponent', () => {
  let component: AdminManageWriterProfileComponent;
  let fixture: ComponentFixture<AdminManageWriterProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManageWriterProfileComponent]
    });
    fixture = TestBed.createComponent(AdminManageWriterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
