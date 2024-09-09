import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServicesComponent } from './sub-services.component';

describe('SubServicesComponent', () => {
  let component: SubServicesComponent;
  let fixture: ComponentFixture<SubServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubServicesComponent]
    });
    fixture = TestBed.createComponent(SubServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
