import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceInfoComponent } from './assistance-info.component';

describe('AssistanceInfoComponent', () => {
  let component: AssistanceInfoComponent;
  let fixture: ComponentFixture<AssistanceInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistanceInfoComponent]
    });
    fixture = TestBed.createComponent(AssistanceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
