import { Component, OnInit } from '@angular/core';
import { ApplicantService } from "../../services/ApplicantService/applicant.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/UsersService/user.service";
import { JobToApplicantService } from "../../services/JobToApplicantService/job-to-applicant.service";


@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
    id: number;
  applicantsObj: any;
  skillsObj:any;
  Name: string;
  Title: string;
  Email: string;
  Phone: string;
  Position: string;
  YearOfExperience: number;
  CV: string;
  isPublished:boolean; 
  MatchingJobsList:any;

  ngOnInit() {}
  constructor(private route: ActivatedRoute, private userService: UserService,
    private applicantService: ApplicantService, 
    private JToAService:JobToApplicantService) {
          this.id = route.snapshot.params['id'];

    this.applicantService.GetOneApplicant(this.id).subscribe(rsp => {
         this.applicantsObj = rsp.json();       
        console.log("applicants: =>");
        console.log(this.applicantsObj);

        this.GetApplicantSkills(this.applicantsObj.Id);
        this.Name = this.applicantsObj.Name;
        this.Title = this.applicantsObj.Title;
        this.Email = this.applicantsObj.Email;
        this.Phone = this.applicantsObj.Phone;
        this.Position = this.applicantsObj.Position;
        this.YearOfExperience = this.applicantsObj.YearOfExperience;
        this.CV = this.applicantsObj.Cv;
        this.isPublished = this.applicantsObj.IsPublished;
  
    },
      (err) => {
        console.log("error : " + err);
      });


      this.JToAService.GetMatchingJobs(this.id).subscribe(rsp => {
      if (rsp.status == 200) {
        this.MatchingJobsList = rsp.json();
        console.log("Matching Jobs List: =>");
        console.log(this.MatchingJobsList);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
     }


     GetApplicantSkills(id:number){           
    this.applicantService.GetApplicantSkills(id).subscribe(rsp => {
      if (rsp.status == 200) {
        this.skillsObj = rsp.json();
        console.log("applicant skills Obj: =>");
        console.log(this.skillsObj);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
     }


     
Publish(){
  let applicant = this.applicantsObj;
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
}
