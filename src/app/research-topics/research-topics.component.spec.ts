import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchTopicsComponent } from './research-topics.component';

describe('ResearchTopicsComponent', () => {
  let component: ResearchTopicsComponent;
  let fixture: ComponentFixture<ResearchTopicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResearchTopicsComponent]
    });
    fixture = TestBed.createComponent(ResearchTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
