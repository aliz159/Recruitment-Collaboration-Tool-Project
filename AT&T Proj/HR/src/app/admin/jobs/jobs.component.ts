import { Component, OnInit } from '@angular/core';
import { JobService } from "../../services/JobService/job.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobComponent implements OnInit {
  JobObj:any;
  JobId:any;
  RecruitmentId:any;

  strUniqueID:string;
  UserId:number;
  Name:string;
  Position:string;
  Requirements:string;
 Description:string;
  YearOfExperience:number;

  SkillsForJob:any;
  constructor(private jobService:JobService,private route: ActivatedRoute,) {
     this.JobId = route.snapshot.params['id'];
     this.RecruitmentId = route.snapshot.params['RecruitmentId'];
   }

  ngOnInit() {
   this.GetOneJob(Number(this.JobId));
   this.GetJobSkills(Number(this.JobId));
  }



 GetOneJob(jobId:number){
 this.jobService.GetOneJob(jobId).subscribe(rsp => {
        this.JobObj = rsp;
        console.log("this.applicantsObj");
        console.log(this.JobObj);
        //set Job properties to Fields
        this.strUniqueID =this.JobObj.strUniqueID;
        this.UserId = this.JobObj.UserId;
        this.Name = this.JobObj.Name;
        this.Position = this.JobObj.Position;
        this.Requirements = this.JobObj.Requirements;
        this.Description = this.JobObj.Description;
        this.YearOfExperience = this.JobObj.YearOfExperience;
    },
      (err) => {
        console.log("error : " + err);
      });
}


    GetJobSkills(id: number) {   
      debugger;
    this.jobService.GetSkillsetForJob(id).subscribe(rsp => {debugger;
        this.SkillsForJob = rsp;
        console.log("Skills For Job");
        console.log(this.SkillsForJob);
    },
      (err) => {debugger;
        console.log("error : " + err);
      });
  }














}
