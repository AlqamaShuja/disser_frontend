import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurSampleLevelTypeDetailsComponent } from './our-sample-level-type-details.component';

describe('OurSampleLevelTypeDetailsComponent', () => {
  let component: OurSampleLevelTypeDetailsComponent;
  let fixture: ComponentFixture<OurSampleLevelTypeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurSampleLevelTypeDetailsComponent]
    });
    fixture = TestBed.createComponent(OurSampleLevelTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
