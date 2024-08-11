import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurSamplesComponent } from './our-samples.component';

describe('OurSamplesComponent', () => {
  let component: OurSamplesComponent;
  let fixture: ComponentFixture<OurSamplesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurSamplesComponent]
    });
    fixture = TestBed.createComponent(OurSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
