import { Component, OnInit } from '@angular/core';
import { ApplicantService } from "../../services/ApplicantService/applicant.service";
import { JobToApplicantService } from "../../services/JobToApplicantService/job-to-applicant.service";
import { Router } from "@angular/router";
import { JobService } from "../../services/JobService/job.service";


@Component({
  selector: 'app-all-applicants',
  templateUrl: './all-applicants.component.html',
  styleUrls: ['./all-applicants.component.css']
})
export class AllApplicantsComponent implements OnInit {
  allApplicant: any;
  lock = false;
  Skills: string[];
  applicantObj: any;

  constructor(public jobService: JobService, public applicantService: ApplicantService,
    private router: Router) {
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

  //Updating the applicant's publication in the database
  Publish(applicant: any) {
    this.applicantService.editApplicant(applicant.Id, applicant.Name, applicant.Title,
      applicant.Phone, applicant.Email, applicant.YearOfExperience, applicant.Position, applicant.Cv,
      applicant.IsLocked, applicant.UserIdLockedBy, applicant.NameWhoLocked, true,
      applicant.IsActive, applicant.InterviewDate, applicant.StatusAfterInterview).subscribe(rsp => {
        console.log(rsp.json());
      },
      (err) => {
        console.log("error : " + err);
      });
  }

  SeeApplicant(id: number) {
    this.router.navigate(['/Applicant', id]);
  }

  LockApplicant(applicant: any) {
    window.alert("lock Applicant");
    if (applicant.IsLocked != true) {
      const req = this.applicantService.editApplicant(applicant.Id, applicant.Name, applicant.Title, applicant.Phone,
        applicant.Email, applicant.YearOfExperience, applicant.Position, applicant.Cv, true, applicant.UserIdLockedBy,
        applicant.NameWhoLocked, applicant.IsPublished, applicant.IsActive, applicant.InterviewDate, applicant.StatusAfterView);
      req.subscribe(rsp => {
        console.log("Edited succssfully ")
      },
        (err) => { console.log(err); }
      );
    }
    else {
      window.alert("Applicant is already locked");
    }
  }

  filterBySkills(skill) {

  }

  EditApplicant(applicantId: any) {
    this.router.navigate(['/EditApplicant', applicantId]);
    window.alert("editAPP");
  }

  GetApplicantToDelete(applicant: any) {
    window.alert("del");
    this.applicantObj = applicant;
  }

  //Delete the user
  DeleteApplicantHandler() {
    console.log("applicant Obj before deleting");
    console.log(this.applicantObj);

    this.applicantService.editApplicant(this.applicantObj.Id, this.applicantObj.Name, this.applicantObj.Title,
      this.applicantObj.Phone, this.applicantObj.Email, this.applicantObj.YearOfExperience, this.applicantObj.Position, this.applicantObj.Cv,
      this.applicantObj.IsLocked, this.applicantObj.UserIdLockedBy, this.applicantObj.NameWhoLocked, false,
      false, this.applicantObj.InterviewDate, this.applicantObj.StatusAfterInterview).subscribe(rsp => {
        console.log(rsp.json());
        window.alert('Applicant deleted successfully');

        let index = this.allApplicant.indexOf(this.applicantObj);
        this.allApplicant.splice(index, 1);
        console.log(this.allApplicant);
      },
      (err) => {
        console.log("error : " + err);
        window.alert(JSON.stringify(err));
      });
  }
}
