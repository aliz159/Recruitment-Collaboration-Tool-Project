import { Component, OnInit } from '@angular/core';
import { ApplicantService } from "../../services/ApplicantService/applicant.service";
import { JobToApplicantService } from "../../services/JobToApplicantService/job-to-applicant.service";

@Component({
  selector: 'app-all-applicants',
  templateUrl: './all-applicants.component.html',
  styleUrls: ['./all-applicants.component.css']
})
export class AllApplicantsComponent implements OnInit {
  applicants: any;

  constructor(public applicantService: ApplicantService) {
    this.getAllApplicants();
  }

  ngOnInit() {}

  getAllApplicants() {
    this.applicantService.Get().subscribe(rsp => {
      if (rsp.status == 200) {
        this.applicants = rsp.json();
        console.log("all the applicants:");
        console.log(this.applicants);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }

}
