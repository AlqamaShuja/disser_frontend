import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplelistComponent } from './samplelist.component';

describe('SamplelistComponent', () => {
  let component: SamplelistComponent;
  let fixture: ComponentFixture<SamplelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SamplelistComponent]
    });
    fixture = TestBed.createComponent(SamplelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
