import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatmakesusbestSectComponent } from './whatmakesusbest-sect.component';

describe('WhatmakesusbestSectComponent', () => {
  let component: WhatmakesusbestSectComponent;
  let fixture: ComponentFixture<WhatmakesusbestSectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhatmakesusbestSectComponent]
    });
    fixture = TestBed.createComponent(WhatmakesusbestSectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
