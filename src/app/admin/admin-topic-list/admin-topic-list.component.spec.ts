import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopicListComponent } from './admin-topic-list.component';

describe('AdminTopicListComponent', () => {
  let component: AdminTopicListComponent;
  let fixture: ComponentFixture<AdminTopicListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTopicListComponent]
    });
    fixture = TestBed.createComponent(AdminTopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
