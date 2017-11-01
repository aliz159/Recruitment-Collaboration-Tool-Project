import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllApplicantsComponent } from './all-applicants.component';

describe('AllApplicantsComponent', () => {
  let component: AllApplicantsComponent;
  let fixture: ComponentFixture<AllApplicantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllApplicantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
