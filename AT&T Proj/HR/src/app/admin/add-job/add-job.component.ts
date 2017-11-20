import { Component, OnInit } from '@angular/core';
import { JobService } from "../../services/JobService/job.service";

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  constructor(private jobService: JobService) { }

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



    this.jobService.GetReccruitersManager().subscribe(rsp => {
      if (rsp.status == 200) {
        //debugger;
        this.Managers = rsp.json();
        console.log("Array Manager From DB");
        console.log(this.Managers);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }

  Title: string;
  uniqueID: string;
  position = "Developer";
  YearsExperience: number;
  Description: string;
  Skills: string[];
  Managers: string[];
  Requirements: string;
  ListSkillForJob:number[] = [];
  // ArraySkills: string[] = [];
  ArrayManagers: any[] = [];
  AddManager: boolean = false;
  isActive: boolean = false;
  jobObj: any;
  skillObj: any;

  SaveDatilesJob() {
    
    debugger;
    this.jobService.addJob(this.ArrayManagers[0], this.uniqueID, this.Title, this.position,
      this.Description, this.YearsExperience, this.Requirements, this.isActive)
      .subscribe(rsp => { this.jobObj = rsp;
        console.log("job Obj=>>>>>>>>>>>>");
        console.log(this.jobObj);
        debugger;
        this.jobService.addSkillsetForJob(this.jobObj.Id, this.ListSkillForJob)
        .subscribe(rsp => { 
          debugger; this.skillObj = rsp;
          console.log("skill Added successfully=>>>>>>>>>>");
          console.log(this.skillObj);
          window.alert("the job has Successfully added")
          this.Title = "";
          this.uniqueID = "";
          this.YearsExperience = 0;
          this.Description = "";
          this.Skills=[];
          this.Managers=[];
          this.Requirements = "";
          this.ListSkillForJob = [];
          this.ArrayManagers = [];
          this.ngOnInit();
        },
          (err) => { debugger; console.log("error : " + err); });
      },
        
      (err) => { debugger; console.log("error : " + err); });

    console.log(
      this.ArrayManagers[0], this.Title,
      this.Description, this.ListSkillForJob,
      this.Requirements, this.isActive)
  }




  RecruitingMangersList() {
    this.AddManager = true;
  }




  ManagersArray(manager) {
    if (manager.selected) {
      this.ArrayManagers.push(manager.Id, manager.Name);
    }
    else {
      var removeManager = this.ArrayManagers.indexOf(manager.Id);
      this.ArrayManagers.splice(removeManager, 2);
    }
    console.log(this.ArrayManagers)
  }

  SkillsetArray(skill) {
    if (skill.selected) {
      this.ListSkillForJob.push(skill.Id);
    }
    else {
      var removeSkill = this.ListSkillForJob.indexOf(skill.Id);
      this.ListSkillForJob.splice(removeSkill, 1);
    }
    console.log(this.ListSkillForJob)
  }



  addSkill() {
  }
}
