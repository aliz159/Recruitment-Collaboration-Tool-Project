import { Component, OnInit } from '@angular/core';
import { JobService } from "../../services/JobService/job.service";
import { ApplicantService } from "../../services/ApplicantService/applicant.service";
import { InterviewSummaryService } from "../../services/InterviewSummaryService/interview-summary.service";
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.css']
})
export class AddApplicantComponent implements OnInit {

  Skills: string[];
  name: string;
  email: string;
  title: string;
  position: string = "developer";
  phone: string;
  experience: number;
  //cv:string= "CV CV";
  ApplicantObj: any;
  summary: string;
  AddSkillInput: boolean;
  newSkill: string;
  skillsArryChecked: any[] = [];
  IdApp: number;
  ArraySkills: number[] = [];

  file: File;
  formData: FormData = new FormData();
  options: any;
  apiUrl1: string;


  constructor(private jobService: JobService, private ApplicantService: ApplicantService,
    private http: Http, private InterviweSummary: InterviewSummaryService) { }

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

  SendApplicant(myNgForm: any) {
    const req = this.ApplicantService.addApplicant(this.name, this.title,
      this.email, this.file.name, this.phone, this.experience, this.position);
    req.subscribe(rsp => {

      this.ApplicantObj = rsp;
      //this.AddCV();
      console.log("Applicant obj is : ");
      console.log(this.ApplicantObj);
      //window.alert("The Applicat Has Added Succeessfully :)");

      this.addSkills(this.ApplicantObj.Id);
    },
      (err) => {
        console.log("error : " + err);
      }
    );
  }

  ShowaddSkill() {
    this.AddSkillInput = !this.AddSkillInput;
  }

  addSkills(id: number) {
    const req = this.ApplicantService.addApplicantSkills(id, this.ArraySkills);
    req.subscribe(rsp => {
      console.log("Applicant Skills Added Succeessfully");
      this.newSkill = null;
    }, (err) => {
      console.log("ERROR: " + err);
    });
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
  
  addNewSkill() {
    const req = this.ApplicantService.addSkillset(this.newSkill);
    req.subscribe(rsp => {
      console.log("New Skill Added Succeessfully");
      this.newSkill = null;
    }, (err) => {
      console.log("ERROR: " + err);
    });
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

  // addInterviwe() {

  //   const req = this.ApplicantService.addInterviewSummary(3, this.ApplicantObj[0].Id, this.summary);
  //   req.subscribe(res => { console.log("summery is added successfully") },
  //     (err) => {
  //       console.log("ERROR " + err);
  //     })

  // }
}



