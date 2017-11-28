import { Component } from '@angular/core';
import { JobService } from "../../services/JobService/job.service";
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { UserService } from "../../services/UsersService/user.service";

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

  jobObj: any;


  constructor(public jobService: JobService,
    private router: Router, private userService: UserService) {

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

allUsersObj:any;
  getAllJobs() {
    this.jobService.Get().subscribe(rsp => {
      if (rsp.status == 200) {
        this.allJobs = rsp.json();
        let UserName = this.allJobs.UserId;
        debugger;

        for (var i = 0; i < this.allJobs.length; i++) {
          this.userService.Get().subscribe(rsp => {
            debugger;
            if (rsp.status == 200) {
              this.allUsersObj = rsp.json();
            //  name.Name
            }
           else { console.log("server responded error : " + rsp); }
          },
            (err) => {debugger;
              console.log("error : " + err);
            });
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

    filterBySkills(skill)
    {

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
    window.alert("del");
    this.jobObj = job;
  }

  //Delete the user
  DeleteJobHandler() {
    console.log("job Obj before deleting");
    console.log(this.jobObj);

    this.jobService.editJob(this.jobObj.Id, this.jobObj.UserId, this.jobObj.StrUniqueID,
      this.jobObj.Name, this.jobObj.Position, this.jobObj.Description, this.jobObj.Requirements,
      false, this.jobObj.YearOfExperience).subscribe(rsp => {
        console.log(rsp);
        window.alert('job inactivated successfully');

        let index = this.allJobs.indexOf(this.jobObj);
        this.allJobs.splice(index, 1);
        console.log(this.allJobs);
      },
      (err) => {
        console.log("error : " + err);
        window.alert(JSON.stringify(err));
      });
  }

}
