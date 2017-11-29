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
  allFilterdjobs: any;
  Skills: any[];
  FilterSkills = [];
  skillsObj: any[];
  counter: number = 0;
  SkillsForJob: any;

  openFormToEditJob: boolean = false;

  Title: string;
  UniqueID: string;
  MinimumYearsOfExperience: number;
  Description: string;
  Requirements: string;

  jobObj: any;
  allUsersObj: any;


  constructor(public jobService: JobService,
    private router: Router, private userService: UserService) {
    this.GetSkillSet();
  }


  ngOnInit() {
    this.getAllJobs();
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

  getAllJobs() {
    this.jobService.Get().subscribe(rsp => {
      if (rsp.status == 200) {
        this.allJobs = rsp.json();
        this.allFilterdjobs = this.allJobs;
        let UserName = this.allJobs.UserId;
        debugger;

        for (var i = 0; i < this.allJobs.length; i++) {
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

        console.log("all the jobs:");
        console.log(this.allJobs);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }


  GetJobSkills(id: number, skill, job) {
    debugger;
    this.jobService.GetSkillsetForJob(id).subscribe(rsp => {
      debugger;
      this.SkillsForJob = rsp;

      console.log("Skills For Job");
      console.log(this.SkillsForJob);

      this.FilterSkills.forEach(Fskill => {
        this.SkillsForJob.forEach(jskill => {
          if (Fskill == jskill.Id) {
            return;
          }
          else {
            this.counter++;
          }
        });
      });

      if (this.counter == this.SkillsForJob.length) {
        this.allFilterdjobs = this.allFilterdjobs.filter((s: any) => s.Id != job.Id);
      }
      this.counter = 0;
    },
      (err) => {
        debugger;
        console.log("error : " + err);
      });
  }

  filterBySkills(skill) {
    debugger;
    this.ngOnInit();
    this.allFilterdjobs = this.allJobs;

    if (skill.selected) {
      this.FilterSkills.push(skill.Id);
      this.allFilterdjobs.forEach(job => {
        this.GetJobSkills(job.Id, skill, job);
      });
    }
    else {
      this.FilterSkills = this.FilterSkills.filter((s: any) => s != skill.Id);
    }
    console.log(this.FilterSkills)
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
      false, this.jobObj.YearOfExperience, 0).subscribe(rsp => {
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
