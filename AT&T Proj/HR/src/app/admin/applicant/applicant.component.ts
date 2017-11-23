import { Component, OnInit } from '@angular/core';
import { ApplicantService } from "../../services/ApplicantService/applicant.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/UsersService/user.service";
import { InterviewSummaryService } from "../../services/InterviewSummaryService/interview-summary.service";
import { CookiesService } from "../../services/CookiesService/cookies.service";
import { JobToApplicantService } from "../../services/JobToApplicantService/job-to-applicant.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  ApplicantId: number;
  RecruitmentId: number;

  recruiterObj: any;
  applicantsObj: any;
  skillsObj: any;
  interviewObj: any;
  SummaryObj: any;

  applicantId: number;
  Name: string;
  Title: string;
  Email: string;
  Phone: string;
  Position: string;
  YearOfExperience: number;
  CV: string;
  isPublished: boolean;
  UserIdLockedBy: number;
  IsLocked: boolean;
  nameWhoLocked: string;
  interviewDate: string;

  Summary: string;
  ConnectedRole: string;
  SummaryRecruitment: boolean;
  MatchingJobsList: any;
  showAddSummary = false;
  showCalander = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private applicantService: ApplicantService,
    private SummaryService: InterviewSummaryService,
    private cookiesService: CookiesService,
    private JToAService: JobToApplicantService) {
    debugger;
    this.ApplicantId = route.snapshot.params['id'];
    this.RecruitmentId = route.snapshot.params['RecruitmentId'];
  }

  ngOnInit() {
    this.GetOneApplicant(this.ApplicantId);
    //Check whether the logged-in user is an HR (admin) or recruitment
    this.ConnectedRole = this.cookiesService.getCookie("Role");
    if (this.ConnectedRole == "Admin") {
      this.SummaryRecruitment = false;
      console.log(this.SummaryRecruitment)
    }
    else if (this.ConnectedRole == "Recruiter") {
      this.SummaryRecruitment = true;
      console.log(this.SummaryRecruitment);
      this.GetRecruiter(this.RecruitmentId);
    }
    this.GetMatchingJobs(this.ApplicantId);
  }

  //Get Information about the applicant 
  GetOneApplicant(id: number) {
    this.applicantService.GetOneApplicant(Number(id)).subscribe(rsp => {
      if (rsp.status == 200) {
        this.applicantsObj = rsp.json();
        this.GetApplicantSkills(this.applicantsObj.Id);

        this.GetApplicantInterview(Number(this.ApplicantId));

        console.log("this.applicantsObj");
        console.log(this.applicantsObj);
        //set applicant properties to Fields
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
        this.nameWhoLocked = this.applicantsObj.NameWhoLocked;
        this.interviewDate = this.applicantsObj.InterviewDate;

        if (this.UserIdLockedBy == this.RecruitmentId) {
          this.showAddSummary = true;
        }
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }

  //Get the jobs found to be suitable for the applicant
  GetRecruiter(id: number) {
    this.userService.GetOneUser(Number(id)).subscribe(rsp => {
      if (rsp.status == 200) {
        this.recruiterObj = rsp.json();
        console.log("recruiter Object =>");
        console.log(this.recruiterObj);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }

  //Get the jobs found to be suitable for the applicant
  GetMatchingJobs(id: number) {
    this.JToAService.GetMatchingJobs(Number(id)).subscribe(rsp => {
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

  //Ger applicant's skillset
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

  //Get all summaries of the applicant's interviews
  GetApplicantInterview(ApplicantId: number) {
    debugger;
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

  //Updating the applicant's publication in the database
  Publish() {
    debugger;
    let applicant = this.applicantsObj;
    this.applicantService.editApplicant(applicant.Id, applicant.Name, applicant.Title,
      applicant.Phone, applicant.Email, applicant.YearOfExperience, applicant.Position, applicant.Cv,
      applicant.IsLocked, applicant.UserIdLockedBy, applicant.NameWhoLocked, true,
      applicant.IsActive, applicant.InterviewDate, applicant.StatusAfterInterview).subscribe(rsp => {
        console.log(rsp.json());
        this.isPublished = true;
        //Publication of the applicant for the relevant recruiters by email
        //need to be sent here
      },
      (err) => {
        console.log("error : " + err);
      });
  }

  // Adding the Interview Summary to the database
  addInterview() {
    debugger;
    this.SummaryService.addInterviewSummary(
      Number(this.RecruitmentId), Number(this.ApplicantId), this.Summary)
      .subscribe(rsp => {
        this.interviewObj = rsp;
        window.alert("Interview successfully added");
        this.ngOnInit();
        console.log("interview Obj: =>");
        console.log(this.interviewObj);
      },
      (err) => {
        console.log("error : " + err);
      });
  }

  LockApplicant() {
    debugger;
    if (this.IsLocked != true) {
      const req = this.applicantService.editApplicant(this.applicantsObj.Id,
        this.applicantsObj.Name, this.applicantsObj.Title, this.applicantsObj.Phone,
        this.applicantsObj.Email, this.applicantsObj.YearOfExperience, this.applicantsObj.Position,
        this.CV, true, this.RecruitmentId, this.recruiterObj.Name, this.applicantsObj.IsPublished,
        this.applicantsObj.IsActive, this.applicantsObj.InterviewDate,
        this.applicantsObj.StatusAfterView);
      req.subscribe(rsp => {
        window.alert("Applicant locked succssfully");
        console.log("Applicant locked succssfully");
        this.IsLocked = true;
      },
        (err) => { console.log(err); }
      );
    }
    else {
      window.alert("Applicant is already locked");
    }
  }

  EditApplicant() {
    this.router.navigate(['/EditApplicant', this.applicantsObj.Id]);
    window.alert("editAPP");
  }

  SetInterviewDate(){  
    this.showCalander = !this.showCalander;
   }
}
