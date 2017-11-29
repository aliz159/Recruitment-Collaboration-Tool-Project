import { Component, OnInit } from '@angular/core';
import { JobService } from "../../services/JobService/job.service";
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { UserService } from "../../services/UsersService/user.service";

@Component({
  selector: 'app-all-archived-jobs',
  templateUrl: './all-archived-jobs.component.html',
  styleUrls: ['./all-archived-jobs.component.css']
})
export class AllArchivedJobsComponent implements OnInit {
  allJobs: any;
  allUsersObj: any;
  Skills: any[];
  IsActive: string;
  jobObj: any;

  constructor(public jobService: JobService,
    private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getAllArchiveJobs();
    this.GetSkillSet();
  }

  GetSkillSet() {
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

  getAllArchiveJobs() {
    debugger;
    this.jobService.GetArchivedJobs().subscribe(rsp => {
      debugger;
      if (rsp.status == 200) {
        this.allJobs = rsp.json();
        let UserName = this.allJobs.UserId;
        debugger;

        for (var i = 0; i < this.allJobs.length; i++) {
          this.GetAllUsers();
        }

        console.log("all the jobs:");
        console.log(this.allJobs);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }


  GetAllUsers() {
    this.userService.Get().subscribe(rsp => {
      debugger;
      if (rsp.status == 200) {
        this.allUsersObj = rsp.json();
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        debugger;
        console.log("error : " + err);
      });
  }


   //Updating the applicant's Activation in the database
  Activate(job: any) {
    this.jobService.editJob(job.Id, job.UserId, job.StrUniqueID,
      job.Name, job.Position, job.Description, job.Requirements,
      true, job.YearOfExperience, 0).subscribe(rsp => {
        console.log(rsp);
        window.alert('job inactivated successfully');
        debugger;
        this.getAllArchiveJobs();
        this.router.navigate(['/AllJobs']);
      },
      (err) => {
        console.log("error : " + err);
      });
  }

  SeeJob(id: number) {
    debugger;
    this.router.navigate(['/Job', id]);
  }

  EditJob(jobId: any) {
    debugger;
    this.router.navigate(['/EditJob', jobId]);
  }

  GetJobToDelete(job: any) {
    this.jobObj = job;
  }

  //Delete the job
  DeleteJobHandler() {
    console.log("job Obj before deleting");
    console.log(this.jobObj);

    this.jobService.deleteJob(this.jobObj).subscribe(rsp => {
        console.log(rsp);
        window.alert('job deleted successfully');

        let index = this.allJobs.indexOf(this.jobObj);
        this.allJobs.splice(index, 1);
        console.log(this.allJobs);
      },
      (err) => {
        console.log("error : " + err);
      });
  }
}
