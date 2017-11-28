import { Component, OnInit } from '@angular/core';
import { ApplicantService } from "../../services/ApplicantService/applicant.service";
import { JobToApplicantService } from "../../services/JobToApplicantService/job-to-applicant.service";
import { Router, ActivatedRoute} from "@angular/router";
import { UserService } from "../../services/UsersService/user.service";
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JobService } from "../../services/JobService/job.service";

@Component({
  selector: 'app-edit-applicant',
  templateUrl: './edit-applicant.component.html',
  styleUrls: ['./edit-applicant.component.css']
})
export class EditApplicantComponent implements OnInit {
  id: any;
  applicantsObj: any;
  skillsObj: any[];
  Name: string;
  Title: string;
  Email: string;
  Phone: string;
  Position: string;
  experience: number;
  CV: string;
  isPublished: boolean;
  isLocked: boolean;
  userIdLockedBy: number;
  isActive: boolean;
  interviewDate: string;
  statusAfterView: string;
  Skills: any[];
  skillAppToEdit: string[] = [];
  file: File;
  formData: FormData = new FormData();
  options: any;
  apiUrl1: string;
  index: number;
  ArraySkills: number[] = [];
  ApplicantObjEdit: any;
  nameWhoLocked: string;
  AppForEdit: any;
  
  ngOnInit() {}


  constructor(private route: ActivatedRoute, private userService: UserService,
    private applicantService: ApplicantService, private http: Http, 
    private router: Router, private jobService: JobService) {
    this.id = route.snapshot.params['id'];
    this.applicantService.GetOneApplicant(this.id).subscribe(rsp => {
      this.applicantsObj = rsp.json();
      console.log("applicants: =>");
      console.log(this.applicantsObj);
      
      this.GetApplicantSkills(this.applicantsObj.Id);

      this.Name = this.applicantsObj.Name;
      this.Title = this.applicantsObj.Title;
      this.Email = this.applicantsObj.Email;
      this.Phone = this.applicantsObj.Phone;
      this.Position = this.applicantsObj.Position;
      this.experience = this.applicantsObj.YearOfExperience;
      this.CV = this.applicantsObj.Cv;
      this.isPublished = this.applicantsObj.IsPublished;
      this.isLocked = this.applicantsObj.IsLocked;
      this.userIdLockedBy = this.applicantsObj.UserIdLockedBy;
      this.nameWhoLocked = this.applicantsObj.NameWhoLocked;
      this.isActive = this.applicantsObj.IsActive;
      this.interviewDate = this.applicantsObj.InterviewDate;
      this.statusAfterView = this.applicantsObj.StatusAfterInterview;

    },
      (err) => {
        console.log("error : " + err);
      });
  }


  GetApplicantSkills(id: number) {
    this.applicantService.GetApplicantSkills(id).subscribe(rsp => {
      if (rsp.status == 200) {
        this.skillsObj = rsp.json();
        console.log("applicant skills Obj: =>");
        console.log(this.skillsObj);
        this.GetSkillSet();
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }


  GetSkillSet(){
        this.jobService.GetSkillSet().subscribe(rsp => {
      if (rsp.status == 200) {
        this.Skills = rsp.json();
        console.log("Array Skiils From DB");
        console.log(this.Skills);

        //Filter skills that exist for the applicant
        this.skillsObj.forEach(skill => {
        this.Skills = this.Skills.filter((s: any) => s.skill != skill.skill);
        });
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      });
  }


  SaveApplicantEdit(trvformItem: any) {
    if (this.file != undefined) {
      this.CV = (this.file.name).toString();
    }
    
    const req = this.applicantService.editApplicant(this.id, this.Name, this.Title, this.Phone,
      this.Email, this.experience, this.Position, this.CV, this.isLocked, this.userIdLockedBy,
      this.nameWhoLocked, this.isPublished, this.isActive, this.interviewDate, this.statusAfterView);
    req.subscribe(rsp => {
      this.AddCV();
      this.ApplicantObjEdit = rsp;
      this.addSkills(this.id);
      console.log("Edited succssfully ")
      console.log("### ", rsp);
      this.router.navigate(['/AllApplicants']); 
    },
      (err) => { console.log(err); }
    );
  }


  //preper image data
  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.formData.append('uploadFile', this.file, "\\" + this.file.name);
      let headers = new Headers()
      this.options = new RequestOptions({ headers: headers });
      this.apiUrl1 = "http://localhost:55187/api/UploadFile";
    }
  }

  //add file (image) to folder
  AddCV() {
    this.http.post(this.apiUrl1, this.formData, this.options)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(
      data => console.log('success'),
      error => console.log(error)
      )
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

  addSkills(id: number) {
    const req = this.applicantService.addApplicantSkills(id, this.ArraySkills);
    req.subscribe(rsp => {

      console.log("Applicant Skills Added Succeessfully");
    }, (err) => {
      console.log("ERROR: " + err);
    });
  }
}