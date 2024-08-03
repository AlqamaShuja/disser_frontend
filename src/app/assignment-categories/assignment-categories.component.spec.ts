import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentCategoriesComponent } from './assignment-categories.component';

describe('AssignmentCategoriesComponent', () => {
  let component: AssignmentCategoriesComponent;
  let fixture: ComponentFixture<AssignmentCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentCategoriesComponent]
    });
    fixture = TestBed.createComponent(AssignmentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
