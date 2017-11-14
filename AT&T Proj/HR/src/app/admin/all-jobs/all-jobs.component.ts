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

  constructor(public jobService: JobService) {
    this.getAllJobs();
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
}
