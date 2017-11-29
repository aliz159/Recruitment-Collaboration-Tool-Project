import { Component, OnInit } from '@angular/core';
import { JobService } from "../../services/JobService/job.service";
import { ApplicantService } from "../../services/ApplicantService/applicant.service";
import { UserService } from "../../services/UsersService/user.service";
import { Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
  JobId: string;
  jobObj: any;
  SkillsForJob: any;
  AllSkills: any;
  //two way binding
  strUniqueID: string;
  Name: string;
  
  UserId: number;
  UserName:string;
  Position: string;
  YearOfExperience: number;
  Description: string;
  Requirements: string;
  IsActive: boolean;
  MoreSkillsForJob:any[]=[];

  AddSkillInput: boolean = false;
  newSkill: string;

  constructor(private route: ActivatedRoute,
    private jobService: JobService,
    private ApplicantService: ApplicantService,
    private router: Router, 
    private userService: UserService) {

    this.JobId = route.snapshot.params['id'];
    this.GetJobSkills(Number(this.JobId)); 
    debugger;
  }

  ngOnInit() {
    this.GetOneJob(Number(this.JobId));
    this.GetJobSkills(Number(this.JobId)); 
  }


  GetOneJob(id:any) {
    this.jobService.GetOneJob(id).subscribe(rsp => {
      this.jobObj = rsp;

      this.jobObj.Id;
      this.strUniqueID = this.jobObj.strUniqueID;
      this.Name = this.jobObj.Name;
      this.UserId = this.jobObj.UserId;
      this.IsActive = this.jobObj.IsActive;
      this.Position = this.jobObj.Position;
      this.YearOfExperience = this.jobObj.YearOfExperience;
      this.Description = this.jobObj.Description;
      this.Requirements = this.jobObj.Requirements;
     
      this.GetUserNameForJob(this.UserId);
      console.log("job Obj = > "); console.log(this.jobObj);
    },
      (err) => {
        console.log("error : " + err);
      });
  }


  GetJobSkills(id:number) {
    debugger;
    this.jobService.GetSkillsetForJob(id).subscribe(rsp => {
      debugger;
      this.SkillsForJob = rsp;
      console.log("Skills For Job");
      console.log(this.SkillsForJob);
      this.GetSkillSet();  
    },
      (err) => {
        debugger;
        console.log("error : " + err);
      });
  }

  //all skillSet
  GetSkillSet() {
    this.jobService.GetSkillSet().subscribe(rsp => {
      if (rsp.status == 200) {
        this.AllSkills = rsp.json();

        console.log("Array Skiils From DB");
        console.log(this.AllSkills);
    
        //Filter skills that exist for the applicant
        this.SkillsForJob.forEach(skill => {
        this.AllSkills = this.AllSkills.filter((s: any) => s.skill != skill.skill);
        });
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }


  addSkill() {
    debugger;
    this.AddSkillInput = !this.AddSkillInput;
  }


 GetUserNameForJob(UserId:number){
   debugger;
    this.userService.GetOneUser(UserId).subscribe(rsp => {
     debugger;
     let User = rsp.json();
      this.UserName = User.Name;
      console.log("Skills For Job"); console.log(this.SkillsForJob);
    },
      (err) => {
        debugger;
        console.log("error : " + err);
      });
  }


  SaveDatilesJob() {
    debugger;
    this.jobService.editJob(Number(this.JobId), this.UserId,
      this.strUniqueID, this.Name, this.Position, this.Description,
      this.Requirements, this.IsActive, this.YearOfExperience, 0).subscribe(rsp => {
        this.jobObj = rsp;
        console.log("job Obj =>");
        console.log(this.jobObj);
        debugger;
        //add only the new skills to write in DB
        this.jobService.addSkillsetForJob(Number(this.JobId), this.MoreSkillsForJob).subscribe(rsp => {
          let skillObj = rsp;
           console.log("skill Added successfully=>>>>>>>>>>");
            console.log(skillObj);
           window.alert("the job has Successfully Update")
           this.ngOnInit();
           this.router.navigate(['/AllJobs']);
        },
          (err) => { debugger; console.log("error : " + err); });
      },
      (err) => { debugger; console.log("error : " + err); });
  }





  SkillsetArray(skill) {
    debugger;
    if (skill.selected) {
      this.MoreSkillsForJob.push(skill.Id);
    }
    else {
      var removeSkill = this.MoreSkillsForJob.indexOf(skill.Id);
      this.MoreSkillsForJob.splice(removeSkill, 1);
    }
    console.log(this.SkillsForJob)
  }



  addNewSkillForJob() {
    debugger;
    this.ApplicantService.addSkillset(this.newSkill).subscribe(rsp => {
      console.log("New Skill Added Succeessfully");
      this.newSkill = null;
    }, (err) => {
      console.log("ERROR: " + err);
    });
  }
}
