import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArchivedApplicantsComponent } from './all-archived-applicants.component';

describe('AllArchivedApplicantsComponent', () => {
  let component: AllArchivedApplicantsComponent;
  let fixture: ComponentFixture<AllArchivedApplicantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllArchivedApplicantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllArchivedApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
