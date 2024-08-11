import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToOrderSectComponent } from './how-to-order-sect.component';

describe('HowToOrderSectComponent', () => {
  let component: HowToOrderSectComponent;
  let fixture: ComponentFixture<HowToOrderSectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HowToOrderSectComponent]
    });
    fixture = TestBed.createComponent(HowToOrderSectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
