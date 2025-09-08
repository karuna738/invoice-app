import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsCreateComponent } from './terms-create.component';

describe('TermsCreateComponent', () => {
  let component: TermsCreateComponent;
  let fixture: ComponentFixture<TermsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsCreateComponent],
    });
    fixture = TestBed.createComponent(TermsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
