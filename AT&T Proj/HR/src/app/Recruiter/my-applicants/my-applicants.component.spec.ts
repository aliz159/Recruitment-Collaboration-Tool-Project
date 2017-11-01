import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApplicantsComponent } from './my-applicants.component';

describe('MyApplicantsComponent', () => {
  let component: MyApplicantsComponent;
  let fixture: ComponentFixture<MyApplicantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyApplicantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
