import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDesireGradeComponent } from './admin-desire-grade.component';

describe('AdminDesireGradeComponent', () => {
  let component: AdminDesireGradeComponent;
  let fixture: ComponentFixture<AdminDesireGradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDesireGradeComponent]
    });
    fixture = TestBed.createComponent(AdminDesireGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
