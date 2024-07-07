import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToWriteComponent } from './how-to-write.component';

describe('HowToWriteComponent', () => {
  let component: HowToWriteComponent;
  let fixture: ComponentFixture<HowToWriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HowToWriteComponent]
    });
    fixture = TestBed.createComponent(HowToWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
