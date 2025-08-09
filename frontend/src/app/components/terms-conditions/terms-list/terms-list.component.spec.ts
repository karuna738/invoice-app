import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsListComponent } from './terms-list.component';

describe('TermsListComponent', () => {
  let component: TermsListComponent;
  let fixture: ComponentFixture<TermsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsListComponent]
    });
    fixture = TestBed.createComponent(TermsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
