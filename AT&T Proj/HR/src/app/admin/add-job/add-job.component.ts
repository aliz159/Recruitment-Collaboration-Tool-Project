import { Component, OnInit } from '@angular/core';
import { Job } from "./Job.interface";
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
  uniqueID:string;
  position = "Developer";
  YearsExperience: number;
  Description: string;
  Skills: string[];
  Managers: string[];
  Requirements: string;
  ArraySkills: string[] = [];
  ArrayManagers: any[] = [];
  AddManager: boolean = false;
  isActive: boolean = false;
  jobObj:any;
  skillObj:any[];

  SaveDatilesJob() {
    let allSkills = this.ArraySkills.toString();
    
    this.jobService.addJob(this.ArrayManagers[0],this.uniqueID, this.Title,this.position,
      this.Description,this.YearsExperience, this.Requirements, this.isActive).subscribe(rsp => {
        //if (rsp.status == 200) { 
          this.jobObj = rsp;
          console.log("job Obj=>>>>>>>>>>>>");
          console.log(this.jobObj);
      
            debugger;
             this.jobService.addSkillsetForJob(this.jobObj.Id,allSkills).subscribe(rsp => {
             //if (rsp.status == 200) { 
               debugger; 
                this.skillObj = rsp;
                //window.alert("skill Added successfully=>>>>>>>>>>")
                console.log("skill Added successfully=>>>>>>>>>>");
                console.log(this.skillObj);
                window.alert("the job has Successfully added")
             // }
            //  else {debugger;  console.log("server responded error : " + rsp); }
            },
             (err) => { debugger; console.log("error : " + err); });


        //}
       // else {debugger; console.log("server responded error : " + rsp);//}
    },
      (err) => { debugger; console.log("error : " + err); });

    console.log(
      this.ArrayManagers[0], this.Title,
      this.Description, allSkills,
      this.Requirements, this.isActive)
  }




  RecruitingMangersList() {
    this.AddManager = true;
    //   this.RecruitingManagers ;
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
      this.ArraySkills.push(skill.Id);
    }
    else {
      var removeSkill = this.ArraySkills.indexOf(skill.Id);
      this.ArraySkills.splice(removeSkill, 1);
    }
    console.log(this.ArraySkills)
  }



  addSkill() {
  }
  //  RecruitingManagers = [
  //   { value: 'Avi', display: 'Avi' },
  //   { value: 'Liat', display: 'Liat' },
  //   { value: 'Yaffa', display: 'Yaffa' },// ];
  //  Skills1 = [
  //   { value: 'HTML', display: 'HTML' },
  //   { value: 'CSS', display: 'CSS' },
  //   { value: 'Python', display: 'Python' },
  //   { value: 'C', display: 'C' },
  //   { value: 'JavaScript', display: 'JavaScript' },// ];
}
