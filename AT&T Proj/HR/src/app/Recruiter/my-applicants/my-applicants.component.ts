import { Component, OnInit } from '@angular/core';
import { JobToApplicantService } from "../../services/JobToApplicantService/job-to-applicant.service";
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from "@angular/router";
import { ApplicantService } from "../../services/ApplicantService/applicant.service";
import { UserService } from "../../services/UsersService/user.service";
import { JobService } from "../../services/JobService/job.service";

@Component({
  selector: 'app-my-applicants',
  templateUrl: './my-applicants.component.html',
  styleUrls: ['./my-applicants.component.css']
})
export class MyApplicantsComponent implements OnInit {
  recruiterApplicants: any;
  recruiterID: number;
  recruiterObj: any;
    Skills: any[];


  ngOnInit() { 
        this.jobService.GetSkillSet().subscribe(rsp => {
      if (rsp.status == 200) {
        this.Skills = rsp.json();

        console.log("Array Skiils From DB");
        console.log(this.Skills);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }

  constructor(public jobService: JobService, public jobToApplicantService: JobToApplicantService,
    public ApplicantService: ApplicantService, private router: Router,
    route: ActivatedRoute, public userService: UserService) {
    this.recruiterID = route.snapshot.params['id'];

    this.userService.GetOneUser(this.recruiterID).subscribe(rsp => {
      if (rsp.status == 200) {
        this.recruiterObj = rsp.json();
        console.log("recruiter Obj:");
        console.log(this.recruiterObj);
        this.GetRecruiterApplicants();
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }

  GetRecruiterApplicants() {
    this.ApplicantService.GetRecruiterApplicants(this.recruiterObj.Id, this.recruiterObj.Name,
      this.recruiterObj.Email, this.recruiterObj.Password, this.recruiterObj.UserType).subscribe(rsp => {
        this.recruiterApplicants = rsp;
        console.log("all the allJobToApplicant:");
        console.log(this.recruiterApplicants);
      },
      (err) => {
        console.log("error : " + err);
      });
  }

    LockApplicant(applicant: any) {
    if (applicant.IsLocked != true) {
      const req = this.ApplicantService.editApplicant(applicant.Id, applicant.Name, applicant.Title, applicant.Phone,
        applicant.Email, applicant.YearOfExperience, applicant.Position, applicant.Cv, true, this.recruiterID,
        this.recruiterObj.Name, applicant.IsPublished, applicant.IsActive, applicant.InterviewDate, applicant.StatusAfterView);
      req.subscribe(rsp => {
        window.alert("Applicant locked succssfully");
        console.log("Applicant locked succssfully")
      },
        (err) => { console.log(err); }
      );
    }
    else {
      window.alert("Applicant is already locked");
    }
  }

  SeeApplicant(applicant: any) {
    this.router.navigate(['/Applicant', applicant.Id, this.recruiterID]);
  }
  filterBySkills(skill) {

  }
}
