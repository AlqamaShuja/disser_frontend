import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTextPagesComponent } from './admin-text-pages.component';

describe('AdminTextPagesComponent', () => {
  let component: AdminTextPagesComponent;
  let fixture: ComponentFixture<AdminTextPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTextPagesComponent]
    });
    fixture = TestBed.createComponent(AdminTextPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
