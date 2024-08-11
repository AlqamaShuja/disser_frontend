import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImproveGradesSectComponent } from './improve-grades-sect.component';

describe('ImproveGradesSectComponent', () => {
  let component: ImproveGradesSectComponent;
  let fixture: ComponentFixture<ImproveGradesSectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImproveGradesSectComponent]
    });
    fixture = TestBed.createComponent(ImproveGradesSectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
