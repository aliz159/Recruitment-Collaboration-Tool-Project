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
  recruitersEmail = [];
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
  ShowStatusInterview = false;
  PassOrFail = false;
  addSummaryMassage1: string;
  addSummaryMassage2: string;
  categoryArr = ["General", "Skillset", "CV", "Interview Summery"];
  ApplicantObj: any;
  hrEmail: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private applicantService: ApplicantService,
    private SummaryService: InterviewSummaryService,
    private cookiesService: CookiesService,
    private JToAService: JobToApplicantService) {
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
      this.GetRecruiter(Number(this.RecruitmentId));
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

        if (this.interviewDate != null) {
          this.IsLocked;
          this.addSummaryMassage1 = "if you already interview this applicant,";
          this.addSummaryMassage2 = "plaease add summary on him, and peek status";
          this.ShowStatusInterview = true
          this.GetOneApplicant(this.ApplicantId);
        }
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
    debugger;
    this.userService.GetOneUser(Number(id)).subscribe(rsp => {
      if (rsp.status == 200) {
        debugger;
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
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }

  //Get all summaries of the applicant's interviews
  GetApplicantInterview(ApplicantId: number) {
    this.SummaryService.GetAllApplicantInterview(ApplicantId).subscribe(rsp => {
      if (rsp.status == 200) {
        this.SummaryObj = rsp.json();
        this.Summary = "";
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }

  //Updating the applicant's publication in the database
  recruitersEmail1 = [];
  Subject: string;
  //Updating the applicant's publication in the database
  Publish() {
    let applicant = this.applicantsObj;
    this.applicantService.editApplicant(applicant.Id, applicant.Name, applicant.Title,
      applicant.Phone, applicant.Email, this.applicantsObj.YearOfExperience, applicant.Position, applicant.Cv,
      applicant.IsLocked, applicant.UserIdLockedBy, applicant.NameWhoLocked, true,
      applicant.IsActive, applicant.InterviewDate, applicant.StatusAfterInterview).subscribe(rsp => {
        console.log(rsp);
        this.isPublished = true;
        this.massage = "Notice of a new candidate who is suitable for the job you are recruiting!! Applicant name: " + this.Name +
          "Email: " + this.Email + "phone: " + this.Phone;

        //Publication of the applicant for the relevant recruiters by email
        this.MatchingJobsList.forEach(matchJob => {
          this.userService.GetOneUser(matchJob.UserId).subscribe(rsp => {
            if (rsp.status == 200) {
              debugger;
              let ObjRecruiter = rsp.json();
              console.log("recruiter Object =>");
              console.log(ObjRecruiter);
              this.recruitersEmail1.push(ObjRecruiter.Email);
              console.log("Recruiters Email =>");
              console.log(this.recruitersEmail1);
            }
            else { console.log("server responded error : " + rsp); }
          },
            (err) => {
              console.log("error : " + err);
            });
        });

      },
      (err) => {
        console.log("error : " + err);
      });
  }

  objManager: any;
  // Adding the Interview Summary to the database
  addInterview() {
    debugger;
    this.SummaryService.addInterviewSummary(
      Number(this.RecruitmentId), this.recruiterObj.Name, Number(this.ApplicantId), this.Summary)
      .subscribe(rsp => {
        debugger;
        this.interviewObj = rsp;
        window.alert("Interview successfully added");
        this.ngOnInit();
        console.log("interview Obj: =>");
        console.log(this.interviewObj);
        debugger;
        this.addSummaryMassage1 = "if you already interview this applicant,";
        this.addSummaryMassage2 = "plaease add summary on him, and peek status";
      },
      (err) => {
        console.log("error : " + err);
      });
  }

  LockApplicant() {
    if (this.IsLocked != true) {
      this.applicantService.editApplicant(this.applicantsObj.Id,
        this.applicantsObj.Name, this.applicantsObj.Title, this.applicantsObj.Phone,
        this.applicantsObj.Email, this.applicantsObj.YearOfExperience, this.applicantsObj.Position,
        this.CV, true, this.RecruitmentId, this.recruiterObj.Name, this.applicantsObj.IsPublished,
        this.applicantsObj.IsActive, this.applicantsObj.InterviewDate,
        this.applicantsObj.StatusAfterView).subscribe(rsp => {
          window.alert("Applicant locked succssfully");
          console.log("Applicant locked succssfully");
          this.IsLocked = true;
          this.GetOneApplicant(this.ApplicantId)
        },
        (err) => { console.log(err); }
        );
    }
    else {
      window.alert("Applicant is already locked");
    }
  }

  //update in db applicant status=Fail, IsActive=false,isLocked=false,userIdLockedBy=0
  Fail_Applicant() {
    debugger;
    let status = this.AddStatusInterview("Fail", false, false, -1);
    debugger;
    this.GetOneApplicant(this.ApplicantId);
    debugger;
  }

  //send an email to HR + add Summary
  Pass_Applicant() {
    debugger;
    let status = this.AddStatusInterview("Pass", true, true, this.RecruitmentId)
    this.GetOneApplicant(this.ApplicantId);
    debugger;
  }

  //rolle down to add summary
  NotRelevant_Applicant() {
    this.AddStatusInterview("Not Relevant", true, false, -1)
    debugger;
    this.GetOneApplicant(this.ApplicantId);
  }

  AddStatusInterview(status: string, isActive: boolean, isLocked: boolean, userIdLockedBy: number) {
    this.applicantService.editApplicant(this.ApplicantId,
      this.applicantsObj.Name, this.applicantsObj.Title,
      this.applicantsObj.Phone, this.applicantsObj.Email,
      this.applicantsObj.YearOfExperience, this.applicantsObj.Position,
      this.applicantsObj.Cv, isLocked, userIdLockedBy,
      this.applicantsObj.NameWhoLocked, true, isActive,
      null, status).subscribe(rsp => {
        let objApplicant = rsp;
        window.alert("Your choice: " + status + " was accepted");
        //get all hr email
        window.alert("now HR function");
        if (objApplicant.StatusAfterInterview == "Pass") {
          //this.hrEmail = "";
          this.GetAllUsers("Pass");
        }
        if (objApplicant.StatusAfterInterview == "Fail") {
          this.GetAllUsers("Fail");
        }

        // this.IsLocked = true;
      },
      (err) => { debugger; console.log(err); }
      );
  }



  name = "yaffa2077@gmail.com";
  PassOrFailSubject: string;
  massage: string;

  EditApplicant() {
    this.router.navigate(['/EditApplicant', this.applicantsObj.Id]);
    window.alert("editAPP");
  }

  SetInterviewDate() {
    this.showCalander = !this.showCalander;
    debugger;
    this.applicantService.editApplicant(Number(this.ApplicantId),
      this.applicantsObj.Name, this.applicantsObj.Title,
      this.applicantsObj.Phone, this.applicantsObj.Email,
      this.applicantsObj.YearOfExperience, this.applicantsObj.Position,
      this.applicantsObj.Cv, this.applicantsObj.IsLocked,
      this.applicantsObj.UserIdLockedBy,
      this.applicantsObj.NameWhoLocked, true, true,
      this.interviewDate, "")
      .subscribe(rsp => {
        debugger;
        window.alert("You Set an interview date");

        this.ShowStatusInterview = true;
        this.GetOneApplicant(this.ApplicantId);

        this.addSummaryMassage1 = "if you already interview this applicant,";
        this.addSummaryMassage2 = "plaease add summary on him, and peek status";
        //this.ShowStatusInterview = true;
      },
      (err) => { console.log(err); }
      );
  }

  allusers: any;
  EmailHRArray: any[] = [];
  GetAllUsers(status: string) {
    this.userService.Get().subscribe(rsp => {
      if (rsp != null) {
        window.alert("good + allUsers")
        this.allusers = rsp.json();
        this.PassOrFail = true;
        debugger;
        for (var i = 0; i < this.allusers.length; i++) {
          if (status == "Pass" && this.allusers[i].UserType == "Admin") {
            debugger;
            let useId = this.allusers.indexOf(this.allusers[i])
            this.EmailHRArray.push(this.allusers[useId].Email)
            debugger;

            this.PassOrFailSubject = "Pass"
            this.massage = "Applicant: " + this.Name + " passed, Phone: " + this.Phone + " Email: " + this.Email;
            console.log(this.EmailHRArray);
            //send an email to all HR - that this applicant has Pass
          }
          if (status == "Fail" && this.allusers[i].UserType == "Admin") {
            //send an email to all HR - that this applicant has fail
            debugger;
            let useId = this.allusers.indexOf(this.allusers[i])
            this.EmailHRArray.push(this.allusers[useId].Email)
            debugger;

            this.EmailHRArray.push(this.allusers[useId].Email)

            this.massage = "Applicant: " + this.Name + " failed, Phone: " + this.Phone + " Email: " + this.Email;
            this.PassOrFailSubject = "Fail"
          }
        }
        console.log(this.allusers)
      }
      else { console.log("=>>>>>>>>>>>>>>>>>>>>> "); }
    },
      (err) => {
        console.log("error : " + err);
      });
    debugger;
  }



  GetApplicantToDelete() {
    window.alert("del");
    this.ApplicantObj = this.applicantsObj;
  }

  //Delete the user
  DeleteApplicantHandler() {
    console.log("applicant Obj before deleting");
    console.log(this.ApplicantObj);

    this.applicantService.editApplicant(this.ApplicantObj.Id, this.ApplicantObj.Name, this.ApplicantObj.Title,
      this.ApplicantObj.Phone, this.ApplicantObj.Email, this.ApplicantObj.YearOfExperience, this.ApplicantObj.Position, this.ApplicantObj.Cv,
      this.ApplicantObj.IsLocked, this.ApplicantObj.UserIdLockedBy, this.ApplicantObj.NameWhoLocked, false,
      false, this.ApplicantObj.InterviewDate, this.ApplicantObj.StatusAfterInterview).subscribe(rsp => {
        console.log(rsp.json());
        window.alert('Applicant deleted successfully');
      },
      (err) => {
        console.log("error : " + err);
        window.alert(JSON.stringify(err));
      });
  }
}