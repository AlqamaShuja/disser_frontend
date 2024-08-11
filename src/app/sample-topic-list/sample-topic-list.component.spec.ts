import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTopicListComponent } from './sample-topic-list.component';

describe('SampleTopicListComponent', () => {
  let component: SampleTopicListComponent;
  let fixture: ComponentFixture<SampleTopicListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SampleTopicListComponent]
    });
    fixture = TestBed.createComponent(SampleTopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
