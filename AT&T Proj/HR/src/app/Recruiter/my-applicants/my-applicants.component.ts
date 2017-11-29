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
  filterdRecruiterApp: any;
  recruiterID: number;
  recruiterObj: any;
 Skills: string[];
  applicantObj: any;
  FilterSkills = [];
  skillsObj: any[];
  counter: number = 0;
  counterFullMatch: number = 0;

  ngOnInit() { 
    this.GetRecruiterApplicants();
  }

  constructor(public jobService: JobService, public jobToApplicantService: JobToApplicantService,
    public ApplicantService: ApplicantService, private router: Router,
    public applicantService: ApplicantService, route: ActivatedRoute, public userService: UserService) {
    this.recruiterID = route.snapshot.params['id'];
    this.GetSkillSet();
    this.GetOneUser(this.recruiterID);
  }

  GetRecruiterApplicants() {
    this.ApplicantService.GetRecruiterApplicants(this.recruiterObj.Id, this.recruiterObj.Name,
      this.recruiterObj.Email, this.recruiterObj.Password, this.recruiterObj.UserType).subscribe(rsp => {
        this.recruiterApplicants = rsp;
        this.filterdRecruiterApp = this.recruiterApplicants;
        console.log("all the allJobToApplicant:");
        console.log(this.recruiterApplicants);
      },
      (err) => {
        console.log("error : " + err);
      });
  }

  GetOneUser(id:any){
    this.userService.GetOneUser(id).subscribe(rsp => {
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

  GetSkillSet(){
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
    LockApplicant(applicant: any) {
    if (applicant.IsLocked != true) {
      const req = this.ApplicantService.editApplicant(applicant.Id, applicant.Name, applicant.Title, applicant.Phone,
        applicant.Email, applicant.YearOfExperience, applicant.Position, applicant.Cv, true, this.recruiterID,
        this.recruiterObj.Name, applicant.IsPublished, applicant.IsActive, applicant.InterviewDate, applicant.StatusAfterView);
      req.subscribe(rsp => {
        window.alert("Applicant locked succssfully");
        console.log("Applicant locked succssfully");
        this.GetRecruiterApplicants();
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

    GetApplicantSkills(id: number, skill, applicant) {
    this.applicantService.GetApplicantSkills(id).subscribe(rsp => {
      if (rsp.status == 200) {
        this.skillsObj = rsp.json();
        console.log("applicant skills Obj: =>");
        console.log(this.skillsObj);

        this.FilterSkills.forEach(Fskill => {
          this.skillsObj.forEach(Askill => {
            if (Fskill == Askill.Id) {
              this.counterFullMatch++;
            }
            // else {
            //   this.counter++;
            // }
          });
        });
        if(this.counterFullMatch != this.FilterSkills.length){
          this.filterdRecruiterApp = this.filterdRecruiterApp.filter((s: any) => s.Id != applicant.Id);
        }
        // if (this.counter == this.skillsObj.length) {
        //   this.filterdRecruiterApp = this.filterdRecruiterApp.filter((s: any) => s.Id != applicant.Id);
        // }
        this.counter = 0;
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
    this.filterdRecruiterApp = this.recruiterApplicants;

    if (skill.selected) {
      this.FilterSkills.push(skill.Id);

      this.filterdRecruiterApp.forEach(applicant => {

        this.GetApplicantSkills(applicant.Id, skill, applicant);
      });
    }
    else {
        this.FilterSkills = this.FilterSkills.filter((s: any) => s != skill.Id);
    }

    console.log(this.FilterSkills);
  }
}
