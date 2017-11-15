import { Component, OnInit } from '@angular/core';
import { ApplicantService } from "../../services/ApplicantService/applicant.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/UsersService/user.service";
UserService
@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  constructor(private route: ActivatedRoute, private userService: UserService,
    private applicantService: ApplicantService) { }

  id: string;
  applicantsObj: any;
  skillsObj:any;
  Name: string;
  Title: string;
  Phone: string;
  Position: string;
  YearOfExperience: number;
  
  CV: string;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.applicantService.GetApplicantSkills(Number(this.id)).subscribe(rsp => {
      if (rsp.status == 200) {
        this.skillsObj = rsp.json();
        console.log("skills Obj: =>");
        console.log(this.skillsObj);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });







    this.applicantService.GetOneApplicant(Number(this.id)).subscribe(rsp => {
      if (rsp.status == 200) {
         this.applicantsObj = rsp.json();
        this.Name = this.applicantsObj.Name;
        this.Title = this.applicantsObj.Title;
        this.Phone = this.applicantsObj.Phone;
        this.Position = this.applicantsObj.Position;
        this.YearOfExperience = this.applicantsObj.YearOfExperience;
        this.CV = this.applicantsObj.Cv;
        console.log("applicants: =>");
        console.log(this.applicantsObj);
        // Cv
        // InterviewDate
        // IsActive
        // IsLocked
        // IsPublished
        // StatusAfterInterview
        // UserIdLockedBy
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }




}
