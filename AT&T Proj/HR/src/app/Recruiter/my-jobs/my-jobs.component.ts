import { Component, OnInit } from '@angular/core';
import { JobToApplicantService } from "../../services/JobToApplicantService/job-to-applicant.service";
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/UsersService/user.service";
import { JobService } from "../../services/JobService/job.service";

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {
  recruiterJobs: any;
  recruiterID: number;
  recruiterObj: any;
  Skills: any[];


  ngOnInit() {
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

  constructor(public jobService: JobService, private router: Router,
    route: ActivatedRoute, public userService: UserService) {
    this.recruiterID = route.snapshot.params['id'];
    this.GetOneUser();
  }

  GetOneUser() {
    this.userService.GetOneUser(this.recruiterID).subscribe(rsp => {
      if (rsp.status == 200) {
        this.recruiterObj = rsp.json();
        console.log("recruiter Obj:");
        console.log(this.recruiterObj);
        this.GetRecruiterJobs();
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }
  GetRecruiterJobs() {
    this.jobService.GetRecruiterJobs(this.recruiterObj.Id, this.recruiterObj.Name,
      this.recruiterObj.Email, this.recruiterObj.Password, this.recruiterObj.UserType).subscribe(rsp => {
        this.recruiterJobs = rsp;
        console.log("all the recruiter jobs:");
        console.log(this.recruiterJobs);
      },
      (err) => {
        console.log("error : " + err);
      });
  }

  SeeJob(id: number) {
    this.router.navigate(['/Job', id]);
  }

  EditJob(jobId: any) {
    this.router.navigate(['/EditJob', jobId]);
  }
  
  filterBySkills(skill) {

  }

}
