import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditorComponent } from './admin-editor.component';

describe('AdminEditorComponent', () => {
  let component: AdminEditorComponent;
  let fixture: ComponentFixture<AdminEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditorComponent]
    });
    fixture = TestBed.createComponent(AdminEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
