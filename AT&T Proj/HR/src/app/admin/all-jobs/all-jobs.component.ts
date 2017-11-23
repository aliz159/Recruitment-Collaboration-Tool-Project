import { Component } from '@angular/core';
import { JobService } from "../../services/JobService/job.service";
import { Http } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css']
})
export class AllJobsComponent {
  allJobs: any;
  openFormToEditJob: boolean = false;
  Skills: any[];

  Title: string;
  UniqueID: string;
  MinimumYearsOfExperience: number;
  Description: string;
  Requirements: string;


  constructor(public jobService: JobService,
  private router: Router) {

  }


  ngOnInit() {
    this.getAllJobs();
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


  getAllJobs() {
    this.jobService.Get().subscribe(rsp => {
      if (rsp.status == 200) {
        this.allJobs = rsp.json();
        console.log("all the jobs:");
        console.log(this.allJobs);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }


  //jobEditObj: any;
  MarkJobAsInActive(job: any) {
    debugger;
    console.log("job obj =>>>>>>>>");
    console.log(job);
    this.jobService.editJob(job.Id, job.UserId, job.strUniqueID,
      job.Name, job.Position, job.Description, job.Requirements,
      job.IsActive, job.YearOfExperience).subscribe(rsp => {
        debugger;
        if (rsp == 204) {
          debugger;
          // this.jobEditObj = rsp.json();
          window.alert("the job has been removed")
          this.getAllJobs();
        }
        else { console.log("server responded error : " + rsp); }
      },
      (err) => {
        console.log("error : " + err);
      });
  }







 
  EditJob(job: any) {
  window.alert("edit")
    debugger;
    console.log(job)
    this.openFormToEditJob = true;
    this.Title = job.Name;
    this.UniqueID = job.strUniqueID;
    this.MinimumYearsOfExperience = job.YearOfExperience;
    this.Description = job.Description;
    this.Requirements = job.Requirements;
    
  }


  SeeJob(id:number) {
    if(this.openFormToEditJob != true){
      debugger;
    this.router.navigate(['/Job', id]);
    }
    
  }



}
