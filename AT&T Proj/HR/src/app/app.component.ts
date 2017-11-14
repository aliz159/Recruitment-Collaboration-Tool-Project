import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { NavbarService } from "./services/navBarService/navbar.service";
import { UserService } from "./services/UsersService/user.service";

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
  //IsLogged:true;
  ngOnInit() {
    this.nav.hideMenu();
    this.nav.showLoginForm();
  }

  constructor(public http: Http, public nav: NavbarService, 
    public userService: UserService, public router: Router) {}

  Login() {
    this.userService.UserConfirmation(this.Email, this.Password).subscribe((rsp: any) => {
      this.userObj = rsp;

      if (this.userObj != "user name or password is invalid") {
        if (this.userObj.UserType == "Admin") {
          this.routeToAdminFramework();
          this.nav.showMenu();
          this.nav.hideLoginForm();
        }
        else if (this.userObj.UserType == "Recruiter") {
          this.routeToRecruiterFramework();
          this.nav.showMenu();
          this.nav.hideLoginForm();
        }
      }
    },
      (err) => {
        this.Error = "Email or password incorrect Please try again";
        console.log(err._body);
      });
  }

  routeToRecruiterFramework() {
    this.router.navigate(['/MyApplicants']);
  }

  routeToAdminFramework() {
    this.router.navigate(['/AllJobs']);
  }
}
