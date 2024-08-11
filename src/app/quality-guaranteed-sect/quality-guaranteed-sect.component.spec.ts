import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityGuaranteedSectComponent } from './quality-guaranteed-sect.component';

describe('QualityGuaranteedSectComponent', () => {
  let component: QualityGuaranteedSectComponent;
  let fixture: ComponentFixture<QualityGuaranteedSectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QualityGuaranteedSectComponent]
    });
    fixture = TestBed.createComponent(QualityGuaranteedSectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
