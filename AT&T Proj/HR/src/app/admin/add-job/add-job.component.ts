import { Component, OnInit } from '@angular/core';
import { Job } from "./Job.interface";

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  constructor() { }

   ngOnInit() {
  }

  Title:string;
  Position="Developer";
  YearsExperience:number;
  Description:string;
  Skills:string;
  ArraySkills:string[] = [];
  ArrayManagers:string[] = [];
  AddManager:boolean=false;

  SaveDatilesJob(){
    console.log(this.Title , this.Position,
    this.YearsExperience , this.Description
    ,this.ArraySkills,this.ArrayManagers);
  }




  RecruitingMangersList(){
    this.AddManager = true;
    this.RecruitingManagers ;
  }




  ManagersArray(manager){
 if(manager.selected){
      this.ArrayManagers.push(manager.display);
    }
    else{
      var removeManager = this.ArrayManagers.indexOf(manager.display);
      this.ArrayManagers.splice(removeManager,1);
    }
    console.log(this.ArrayManagers)
  }

  SkillsetArray(skill){
    if(skill.selected){
      this.ArraySkills.push(skill.display);
    }
    else{
      var removeSkill = this.ArraySkills.indexOf(skill.display);
      this.ArraySkills.splice(removeSkill,1);
    }
    console.log(this.ArraySkills)
  }



 addSkill(){
  }


   RecruitingManagers = [
    { value: 'Avi', display: 'Avi' },
    { value: 'Liat', display: 'Liat' },
    { value: 'Yaffa', display: 'Yaffa' },

  ];


   Skills1 = [
    { value: 'HTML', display: 'HTML' },
    { value: 'CSS', display: 'CSS' },
    { value: 'Python', display: 'Python' },
    { value: 'C', display: 'C' },
    { value: 'JavaScript', display: 'JavaScript' },
  ];
}
