import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DissertationSampleAcademicLevelComponent } from './dissertation-sample-academic-level.component';

describe('DissertationSampleAcademicLevelComponent', () => {
  let component: DissertationSampleAcademicLevelComponent;
  let fixture: ComponentFixture<DissertationSampleAcademicLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DissertationSampleAcademicLevelComponent]
    });
    fixture = TestBed.createComponent(DissertationSampleAcademicLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
