import { TestBed, inject } from '@angular/core/testing';

import { JobToApplicantService } from './job-to-applicant.service';

describe('JobToApplicantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobToApplicantService]
    });
  });

  it('should be created', inject([JobToApplicantService], (service: JobToApplicantService) => {
    expect(service).toBeTruthy();
  }));
});
