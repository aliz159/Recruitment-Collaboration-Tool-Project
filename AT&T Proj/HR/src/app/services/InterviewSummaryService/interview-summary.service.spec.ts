import { TestBed, inject } from '@angular/core/testing';

import { InterviewSummaryService } from './interview-summary.service';

describe('InterviewSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterviewSummaryService]
    });
  });

  it('should be created', inject([InterviewSummaryService], (service: InterviewSummaryService) => {
    expect(service).toBeTruthy();
  }));
});
