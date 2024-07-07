import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditions } from './terms-and-conditions.component';

describe('TermsAndConditions', () => {
  let component: TermsAndConditions;
  let fixture: ComponentFixture<TermsAndConditions>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsAndConditions]
    });
    fixture = TestBed.createComponent(TermsAndConditions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
