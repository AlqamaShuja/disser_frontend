import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubjectAreaComponent } from './admin-subject-area.component';

describe('AdminSubjectAreaComponent', () => {
  let component: AdminSubjectAreaComponent;
  let fixture: ComponentFixture<AdminSubjectAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSubjectAreaComponent]
    });
    fixture = TestBed.createComponent(AdminSubjectAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
