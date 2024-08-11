import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalManagerSectComponent } from './personal-manager-sect.component';

describe('PersonalManagerSectComponent', () => {
  let component: PersonalManagerSectComponent;
  let fixture: ComponentFixture<PersonalManagerSectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalManagerSectComponent]
    });
    fixture = TestBed.createComponent(PersonalManagerSectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
