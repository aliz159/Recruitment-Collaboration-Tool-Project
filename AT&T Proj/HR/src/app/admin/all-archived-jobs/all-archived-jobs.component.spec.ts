import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArchivedJobsComponent } from './all-archived-jobs.component';

describe('AllArchivedJobsComponent', () => {
  let component: AllArchivedJobsComponent;
  let fixture: ComponentFixture<AllArchivedJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllArchivedJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllArchivedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
