import { Component } from '@angular/core';
import { JobService } from "../../services/JobService/job.service";
import { Http } from '@angular/http';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css']
})
export class AllJobsComponent {
  allJobs: any;
  openFormToEditJob:boolean=false;
  Skills:any[];
  constructor(public jobService: JobService) {
    this.getAllJobs();
  }


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


  jobEditObj:any;     
  MarkJobAsInActive(job: any) {
    window.alert("hi");
    console.log("job obj =>>>>>>>>");
    console.log(job);

    const req = this.jobService.editJob(job.Id,job.UserId,job.strUniqueID,
      job.Name,job.Position,job.Description,job.Requirements,
     job.IsActive ,job.YearOfExperience)
    .subscribe(rsp => {
      if (rsp.status == 200) {
        debugger;
        this.jobEditObj = rsp.json();
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
   }

// Id
// IsActive
// Position
// "Developer"
// UserId
// YearOfExperience


 Title:string;
 UniqueID:string;
 MinimumYearsOfExperience:number;
  Description:string;
  Requirements:string;
     EditJob(job:any){
       console.log(job)
       this.openFormToEditJob = true;
      this.Title = job.Name;
       this.UniqueID = job.strUniqueID;
       this.MinimumYearsOfExperience = job.YearOfExperience;
       this.Description = job.Description;
      this.Requirements =  job.Requirements;
     }
}
