import { Component, OnInit } from '@angular/core';
import { JobService } from "../../services/JobService/job.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/UsersService/user.service";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobComponent implements OnInit {
  JobObj: any;
  JobId: any;
  RecruitmentId: any;

  strUniqueID: string;
  
  UserId: number;
  UserName:string;

  Name: string;
  Position: string;
  Requirements: string;
  Description: string;
  YearOfExperience: number;

  SkillsForJob: any;
  constructor(private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,private userService: UserService) {
    this.JobId = route.snapshot.params['id'];
    this.RecruitmentId = route.snapshot.params['RecruitmentId'];
  }

  ngOnInit() {
    this.GetOneJob(Number(this.JobId));
    this.GetJobSkills(Number(this.JobId));
  }



  GetOneJob(jobId: number) {
    this.jobService.GetOneJob(jobId).subscribe(rsp => {
      this.JobObj = rsp;
      console.log("this.applicantsObj");
      console.log(this.JobObj);
      //set Job properties to Fields
      this.strUniqueID = this.JobObj.strUniqueID;
      this.UserId = this.JobObj.UserId;
      this.Name = this.JobObj.Name;
      this.Position = this.JobObj.Position;
      this.Requirements = this.JobObj.Requirements;
      this.Description = this.JobObj.Description;
      this.YearOfExperience = this.JobObj.YearOfExperience;
      this.GetUserNameForJob(this.UserId);
    },
      (err) => {
        console.log("error : " + err);
      });
  }


  GetJobSkills(id: number) {
    debugger;
    this.jobService.GetSkillsetForJob(id).subscribe(rsp => {
      debugger;
      this.SkillsForJob = rsp;
      console.log("Skills For Job");
      console.log(this.SkillsForJob);
    },
      (err) => {
        debugger;
        console.log("error : " + err);
      });
  }


  GetUserNameForJob(UserId:number){
    this.userService.GetOneUser(UserId).subscribe(rsp => {
     debugger;
     let User = rsp.json();
      this.UserName = User.Name;
     //window.alert(UserName);
      console.log("Skills For Job");
      console.log(this.SkillsForJob);
    },
      (err) => {
        debugger;
        console.log("error : " + err);
      });
  }








  MarkJobAsInActive(job: any) {
    console.log("job obj =>>>>>>>>");
    console.log(job);
    this.jobService.editJob(job.Id, job.UserId, job.strUniqueID,
      job.Name, job.Position, job.Description, job.Requirements,
      job.IsActive, job.YearOfExperience).subscribe(rsp => {
        if (rsp == 204) {
          window.alert("the job has been removed")
          this.GetOneJob(Number(this.JobId));
        }
        else { console.log("server responded error : " + rsp); }
      },
      (err) => {
        console.log("error : " + err);
      });
  }



  EditJob() {
    debugger;
    this.router.navigate(['/EditJob', this.JobId]);
    window.alert("job Id")
  }
}
