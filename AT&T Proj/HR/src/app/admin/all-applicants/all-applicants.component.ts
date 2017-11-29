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
  allFilterdApplicant: any;
  lock = false;
  Skills: string[];
  applicantObj: any;
  FilterSkills = [];
  skillsObj: any[];
  counter: number = 0;
  counterFullMatch: number = 0;

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
        this.allFilterdApplicant = this.allApplicant;
        console.log("all the applicants:");
        console.log(this.allApplicant);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }

  GetApplicantSkills(id: number, skill, applicant) {
    this.applicantService.GetApplicantSkills(id).subscribe(rsp => {
      if (rsp.status == 200) {
        this.skillsObj = rsp.json();
        console.log("applicant skills Obj: =>");
        console.log(this.skillsObj);

        this.FilterSkills.forEach(Fskill => {
          this.skillsObj.forEach(Askill => {
            if (Fskill == Askill.Id) {
              //return;
              this.counterFullMatch++;
            }
            // else {
            //   this.counter++;
            // }
          });
        });

        if(this.counterFullMatch != this.FilterSkills.length){
          this.allFilterdApplicant = this.allFilterdApplicant.filter((s: any) => s.Id != applicant.Id);
        }
        // if (this.counter == this.skillsObj.length) {
        //   this.allFilterdApplicant = this.allFilterdApplicant.filter((s: any) => s.Id != applicant.Id);
        // }
        this.counter = 0;
        this.counterFullMatch = 0;
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }


  filterBySkills(skill) {
    debugger;
    this.ngOnInit();
    this.allFilterdApplicant = this.allApplicant;

    if (skill.selected) {
      this.FilterSkills.push(skill.Id);

      this.allFilterdApplicant.forEach(applicant => {

        this.GetApplicantSkills(applicant.Id, skill, applicant);
      });
    }
    else {
        this.FilterSkills = this.FilterSkills.filter((s: any) => s != skill.Id);
    }

    console.log(this.FilterSkills);
  }

  //Updating the applicant's publication in the database
  Publish(applicant: any) {
    this.applicantService.editApplicant(applicant.Id, applicant.Name, applicant.Title,
      applicant.Phone, applicant.Email, applicant.YearOfExperience, applicant.Position, applicant.Cv,
      applicant.IsLocked, applicant.UserIdLockedBy, applicant.NameWhoLocked, true,
      applicant.IsActive, applicant.InterviewDate, applicant.StatusAfterInterview).subscribe(rsp => {
        console.log(rsp);
        this.ngOnInit();
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
        console.log(rsp);
        window.alert('Applicant inactivated successfully');
        this.ngOnInit();
      },
      (err) => {
        console.log("error : " + err);
        window.alert(JSON.stringify(err));
      });
  }

}
