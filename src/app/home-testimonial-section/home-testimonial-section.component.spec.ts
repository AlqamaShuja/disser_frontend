import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTestimonialSectionComponent } from './home-testimonial-section.component';

describe('HomeTestimonialSectionComponent', () => {
  let component: HomeTestimonialSectionComponent;
  let fixture: ComponentFixture<HomeTestimonialSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTestimonialSectionComponent]
    });
    fixture = TestBed.createComponent(HomeTestimonialSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
