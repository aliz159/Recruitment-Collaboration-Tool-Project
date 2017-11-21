import { Component, OnInit } from '@angular/core';
import { ApplicantService } from "../../services/ApplicantService/applicant.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/UsersService/user.service";
import { InterviewSummaryService } from "../../services/InterviewSummaryService/interview-summary.service";
import { CookiesService } from "../../services/CookiesService/cookies.service";
import { JobToApplicantService } from "../../services/JobToApplicantService/job-to-applicant.service";

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  ApplicantId: number;
  RecruitmentId: number;

  applicantsObj: any;
  skillsObj: any;
  interviewObj:any;
  SummaryObj:any;

  applicantId: number;
  Name: string;
  Title: string;
  Email: string;
  Phone: string;
  Position: string;
  YearOfExperience: number;
  CV: string;
  isPublished: boolean;
  UserIdLockedBy:number;
  IsLocked:boolean;

  Summary: string;
  ConnectedRole: string;
  SummaryRecruitment: boolean;
  MatchingJobsList:any;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private applicantService: ApplicantService,
    private SummaryService: InterviewSummaryService,
    private cookiesService: CookiesService,
  private JToAService:JobToApplicantService) {
    debugger;
    this.ApplicantId = route.snapshot.params['id'];
    this.RecruitmentId = route.snapshot.params['RecruitmentId'];
  }



  ngOnInit() {
    this.ConnectedRole = this.cookiesService.getCookie("Role");
    if (this.ConnectedRole == "Admin") {
      this.SummaryRecruitment = false;
      console.log(this.SummaryRecruitment)
    }
    else {
      this.SummaryRecruitment = true;
      console.log(this.SummaryRecruitment)
    }

    this.applicantService.GetOneApplicant(Number(this.ApplicantId)).subscribe(rsp => {
      if (rsp.status == 200) {
        this.applicantsObj = rsp.json();
        console.log("applicants: =>");
        console.log(this.applicantsObj);

        this.GetApplicantSkills(this.applicantsObj.Id);
        debugger;
        this.GetApplicantInterview(Number(this.ApplicantId));
        console.log("this.applicantsObj");
        console.log(this.applicantsObj);
        this.applicantId = this.applicantsObj.Id;
        this.Name = this.applicantsObj.Name;
        this.Title = this.applicantsObj.Title;
        this.Email = this.applicantsObj.Email;
        this.Phone = this.applicantsObj.Phone;
        this.Position = this.applicantsObj.Position;
        this.YearOfExperience = this.applicantsObj.YearOfExperience;
        this.CV = this.applicantsObj.Cv;
        this.isPublished = this.applicantsObj.IsPublished;
        this.IsLocked = this.applicantsObj.IsLocked;
        this.UserIdLockedBy = this.applicantsObj.UserIdLockedBy;
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });


  this.JToAService.GetMatchingJobs(Number(this.ApplicantId)).subscribe(rsp => {
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

  
  GetApplicantSkills(id: number) {
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

  GetApplicantInterview(ApplicantId : number){
this.SummaryService.GetAllApplicantInterview(ApplicantId).subscribe(rsp => {
  debugger;   
  if (rsp.status == 200) {
        this.SummaryObj = rsp.json();
        console.log("Summary Obj =>");
        console.log(this.SummaryObj);
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


  addInterviwe() {
    debugger;
    this.SummaryService.addInterviewSummary(
      Number(this.RecruitmentId), Number(this.ApplicantId), this.Summary)
      .subscribe(rsp => {
        //if (rsp.status == 200) {
          this.interviewObj = rsp;
          window.alert("Interview successfully added");
          this.ngOnInit();
          console.log("interview Obj: =>");
          console.log(this.interviewObj);
        // }
        // else { console.log("server responded error : " + rsp); }
      },
      (err) => {
        console.log("error : " + err);
      });
  }
}
