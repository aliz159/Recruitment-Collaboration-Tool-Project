import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { NavbarService } from "./services/navBarService/navbar.service";
import { UserService } from "./services/UsersService/user.service";
import { CookiesService } from "./services/CookiesService/cookies.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Email: string;
  Password: string;
  Error: string;
  userObj: any;
  userID: number;
  search = false;
  HRIsLoggedIn = false;
  //IsLogged=true;
  ngOnInit() {
    this.nav.hideMenu();
    this.nav.showLoginForm();
  }

  constructor(public http: Http, public nav: NavbarService,
    public userService: UserService, public router: Router,
    public cookiesService: CookiesService) { }

  Login() {
    this.userService.UserConfirmation(this.Email, this.Password).subscribe((rsp: any) => {
      this.userObj = rsp;
      if (this.userObj != "user name or password is invalid") {
        //this.nav.showLoginForm();
        this.userID = this.userObj.Id;
        if (this.userObj.UserType == "Admin") {
          this.HRIsLoggedIn = true;
          this.cookiesService.setCoockie("Role",this.userObj.UserType);
          this.nav.showMenu();
          this.nav.hideLoginForm();
          this.routeToAdminFramework();
        }
        else if (this.userObj.UserType == "Recruiter") {
          this.HRIsLoggedIn = false;
          this.cookiesService.setCoockie("Role",this.userObj.UserType);
          this.nav.showMenu();
          this.nav.hideLoginForm();
          this.routeToRecruiterFramework();
        }
      }
    },
      (err) => {
        this.Error = "Email or password incorrect Please try again";
        console.log(err._body);
      });
  }

  Logout() {
    this.nav.hideMenu();
    this.nav.hideLoginForm();
    this.cookiesService.deleteCookie("Role");
    this.router.navigate(['/App']);
    //this.router.navigate(['/App', { relativeTo: this.router }]);
  }

  routeToRecruiterFramework() {
    this.router.navigate(['/MyApplicants', this.userID]);
  }

  routeToAdminFramework() {
    this.router.navigate(['/AllJobs']);
  }

}