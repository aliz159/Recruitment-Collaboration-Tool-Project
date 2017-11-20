import { Component, OnInit } from '@angular/core';
import { ApplicantService } from "../../services/ApplicantService/applicant.service";
import { JobToApplicantService } from "../../services/JobToApplicantService/job-to-applicant.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-all-applicants',
  templateUrl: './all-applicants.component.html',
  styleUrls: ['./all-applicants.component.css']
})
export class AllApplicantsComponent implements OnInit {
  allApplicant: any;

  constructor(public applicantService: ApplicantService,
    private router: Router) {
    // this.getAllApplicants();
  }

  ngOnInit() {
    this.getAllApplicants();
  }

  getAllApplicants() {
    this.applicantService.Get().subscribe(rsp => {
      if (rsp.status == 200) {
        this.allApplicant = rsp.json();
        console.log("all the applicants:");
        console.log(this.allApplicant);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }


Publish(applicant: any){
    this.applicantService.editApplicant(applicant.Id, applicant.Name, applicant.Title, 
      applicant.Phone, applicant.Email, applicant.YearOfExperience,applicant.Position, applicant.Cv, 
      applicant.IsLocked, applicant.UserIdLockedBy,true, 
      applicant.IsActive, applicant.InterviewDate, applicant.StatusAfterInterview).subscribe(rsp => {
        console.log(rsp.json());     
    },
      (err) => {
        console.log("error : " + err);
      });
}

  SeeApplicant(id: number) {
    console.log("=>>>>>>"); console.log(id);
    this.router.navigate(['/Applicant', id]);
  }
  lockApplicant() {
    window.alert("lock Applicant");
  }
}
