import { Component, OnInit } from '@angular/core';
import { ApplicantService } from "../../services/ApplicantService/applicant.service";
import { JobToApplicantService } from "../../services/JobToApplicantService/job-to-applicant.service";
import { Router} from "@angular/router";
import { JobService } from "../../services/JobService/job.service";

@Component({
  selector: 'app-all-archived-applicants',
  templateUrl: './all-archived-applicants.component.html',
  styleUrls: ['./all-archived-applicants.component.css']
})
export class AllArchivedApplicantsComponent implements OnInit {
  allApplicant: any;
  allFilterdApplicant: any;
  lock = false;
  Skills: string[];
  applicantObj: any;
  IsActive: string;
  FilterSkills = [];
  skillsObj: any[];
  counter: number = 0;
  counterFullMatch: number = 0;

  ngOnInit() {
    this.getAllArchiveApplicants();
   }

  constructor(public jobService: JobService, public applicantService: ApplicantService,
    private router: Router) {
      this.GetSkillSet();
  }

  GetSkillSet() {
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


  getAllArchiveApplicants() {
    this.applicantService.GetArchivedApplicants().subscribe(rsp => {
      this.allApplicant = rsp.json();
      this.allFilterdApplicant = this.allApplicant;
      console.log("all the applicants:");
      console.log(this.allApplicant);
    },
      (err) => {
        console.log("error : " + err);
      });
  }

 //Updating the applicant's Activation in the database
  Activate(applicant: any) {
    this.applicantService.editApplicant(applicant.Id, applicant.Name, applicant.Title,
      applicant.Phone, applicant.Email, applicant.YearOfExperience, applicant.Position, applicant.Cv,
      applicant.IsLocked, applicant.UserIdLockedBy, applicant.NameWhoLocked, applicant.IsPublished,
      true, applicant.InterviewDate, applicant.StatusAfterInterview).subscribe(rsp => {
        console.log(rsp);
        debugger;
        this.getAllArchiveApplicants();
        this.router.navigate(['/AllApplicants']);      
      },
      (err) => {
        console.log("error : " + err);
      });
  }



  SeeApplicant(id: number) {
    this.router.navigate(['/Applicant', id]);
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
          });
        });

        if(this.counterFullMatch != this.FilterSkills.length){
          this.allFilterdApplicant = this.allFilterdApplicant.filter((s: any) => s.Id != applicant.Id);
        }
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

  EditApplicant(applicantId: any) {
    this.router.navigate(['/EditApplicant', applicantId]);
  }

  GetApplicantToDelete(applicant: any) {
    this.applicantObj = applicant;
  }

  //Delete the user
  DeleteApplicantHandler() {
    console.log("applicant Obj before deleting");
    console.log(this.applicantObj);

    this.applicantService.deleteApplicant(this.applicantObj).subscribe(rsp => {
        console.log(rsp);
        window.alert('Applicant deleted successfully');

        let index = this.allApplicant.indexOf(this.applicantObj);
        this.allApplicant.splice(index, 1);
        console.log(this.allApplicant);
      },
      (err) => {
        console.log("error : " + err);
      });
  }

}
