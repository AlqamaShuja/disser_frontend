import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurSamplesDynamicCatLevelComponent } from './our-samples-dynamic-cat-level.component';

describe('OurSamplesDynamicCatLevelComponent', () => {
  let component: OurSamplesDynamicCatLevelComponent;
  let fixture: ComponentFixture<OurSamplesDynamicCatLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurSamplesDynamicCatLevelComponent]
    });
    fixture = TestBed.createComponent(OurSamplesDynamicCatLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
