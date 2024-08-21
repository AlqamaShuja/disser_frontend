import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFaqInputComponent } from './admin-faq-input.component';

describe('AdminFaqInputComponent', () => {
  let component: AdminFaqInputComponent;
  let fixture: ComponentFixture<AdminFaqInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFaqInputComponent]
    });
    fixture = TestBed.createComponent(AdminFaqInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
