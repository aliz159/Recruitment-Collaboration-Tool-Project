import { Component, OnInit } from '@angular/core';
import { JobToApplicantService } from "../../services/JobToApplicantService/job-to-applicant.service";
import { Http } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-my-applicants',
  templateUrl: './my-applicants.component.html',
  styleUrls: ['./my-applicants.component.css']
})
export class MyApplicantsComponent implements OnInit {
  applicants: any;
  allJobToApplicant: any;
  recruiterApplicants: any;

  constructor(public jobToApplicantService: JobToApplicantService,
              private router: Router) {
    
  }

  ngOnInit() {
  this.getAllJobToApplicant();
}

  getAllJobToApplicant() {
    this.jobToApplicantService.Get().subscribe(rsp => {
      if (rsp.status == 200) {
        this.allJobToApplicant = rsp.json();
        console.log("all the allJobToApplicant:");
        console.log(this.allJobToApplicant);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }







  SeeApplicant(applicant: any) {
    console.log("=>>>>>>"); console.log(applicant);
    this.router.navigate(['/Applicant', applicant.Id]);
  }
  lockApplicant() {
    window.alert("lock Applicant");
  }



            // this.allJobToApplicant = this.allJobToApplicant.filter((jToA: any) => jToA.UserId == this.userObj.Id);        
            //     this.allJobToApplicant.forEach((jToA: any) => {
            //         this.applicants.forEach((applicant: any) => {
            //             if (jToA.ApplicantId == applicant.Id) {
            //                 this.recruiterApplicants.push(applicant);
            //                 console.log("all the recruiter applicants are:")
            //                 console.log(this.recruiterApplicants)
            //             }
            //         });
            //     });

}
