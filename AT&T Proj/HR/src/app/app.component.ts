import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { NavbarService } from "./services/navBarService/navbar.service";
import { UserService } from "./services/UsersService/user.service";
import { CookiesService } from "./services/CookiesService/cookies.service";
import { ApplicantService } from "./services/ApplicantService/applicant.service";
import { JobService } from "./services/JobService/job.service";
import { JobToApplicantService } from "./services/JobToApplicantService/job-to-applicant.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  IsLogged = false;
  applicants: any;
  recruiterApplicants: any;
  allJobs: any;
  allJobToApplicant: any;
  userSession: any;
  Email: string;
  Password: string;
  Error: string;
  userObj: any;

  ngOnInit() {
    this.nav.hideMenu();
    this.nav.showLoginForm();
  }

  constructor(public http: Http, public nav: NavbarService, public userService: UserService,
    public cookieService: CookiesService, public applicantService: ApplicantService,
    public jobService: JobService, public jobToApplicantService: JobToApplicantService,
    public router: Router) {
    this.getAllJobs();
    this.getAllApplicants();
    this.getAllJobToApplicant();
  }

  getAllJobs() {
    this.jobService.Get().subscribe(rsp => {
      if (rsp.status == 200) {
        this.allJobs = rsp.json();
        console.log("this is all the jobs:");
        console.log(this.allJobs);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }

  getAllApplicants() {
    this.jobToApplicantService.Get().subscribe(rsp => {
      if (rsp.status == 200) {
        this.applicants = rsp.json();
        console.log("These are all the applicants:");
        console.log(this.applicants);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }

  getAllJobToApplicant() {
    this.applicantService.Get().subscribe(rsp => {
      if (rsp.status == 200) {
        this.allJobToApplicant = rsp.json();
        console.log("These are all the allJobToApplicant:");
        console.log(this.allJobToApplicant);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }


  Login() {
    this.userService.UserConfirmation(this.Email, this.Password).subscribe((rsp: any) => {
      this.userObj = rsp.json();

      if (this.userObj != "user name or password is invalid") {

        // this.createCookies();

        if (this.userObj.UserType == "Admin") {
          this.routeToAdminFramework();
        }
        else if (this.userObj.UserType == "Recruiter") {
          // this.allJobToApplicant = this.allJobToApplicant.filter((jToA: any) => jToA.UserId == this.userObj.Id);        
          //       this.allJobToApplicant.forEach((jToA: any) => {
          //           this.applicants.forEach((applicant: any) => {
          //               if (jToA.ApplicantId == applicant.Id) {
          //                   this.recruiterApplicants.push(applicant);
          //                   console.log("all this recruiter applicants are:")
          //                   console.log(this.recruiterApplicants)
          //               }
          //           });
          //       });
          this.routeToRecruiterFramework();
        }

      }
    },
      (err) => {
        this.Error = "Email or password incorrect Please try again";
        console.log(err._body);
      });
  }


  // createCookies() {
  //   let keySessionStr: any = "sessionStr";
  //   let keyUserId: any = "userID";
  //   let keyPrimaryId: any = "sessionPrimaryID";
  //   let keyUserType: any = "Type";
  //   this.cookieService.setCoockie(keySessionStr, this.userSession.SessionId);
  //   this.cookieService.setCoockie(keyUserId, this.userSession.CustomerId);
  //   this.cookieService.setCoockie(keyPrimaryId, this.userSession.Id);
  //   this.cookieService.setCoockie(keyUserType, this.userObj.UserType);
  // }


  routeToRecruiterFramework() {
    this.router.navigate(['/MyApplicants', this.recruiterApplicants]);
  }

  routeToAdminFramework() {
    this.router.navigate(['/AllJobs', this.allJobs]);
  }



}
