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
  lock = false;
  Skills: string[];
  applicantObj: any;
  IsActive: string;

  ngOnInit() {
    this.GetSkillSet();
    this.getAllArchiveApplicants();
   }

  constructor(public jobService: JobService, public applicantService: ApplicantService,
    private router: Router) {
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

    this.applicantService.deleteApplicant(this.applicantObj).subscribe(rsp => {
        console.log(rsp);
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
