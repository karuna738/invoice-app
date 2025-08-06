import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsCreateComponent } from './payments-create.component';

describe('PaymentsCreateComponent', () => {
  let component: PaymentsCreateComponent;
  let fixture: ComponentFixture<PaymentsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsCreateComponent]
    });
    fixture = TestBed.createComponent(PaymentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
