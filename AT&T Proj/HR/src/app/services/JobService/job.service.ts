import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class JobService {
  private url: string;
  private urlSkillSet:string;
  private urlReccruitersManager:string;
  private urlJobSkills:string
  headers: any;

  constructor( @Inject(Http) private http: Http) {
    this.url = "http://localhost:55187/api/Job"; //DB Job
    this.urlSkillSet = "http://localhost:55187/api/Skillsets";//DB skills
    this.urlReccruitersManager = "http://localhost:55187/api/User";//DB Managers
    this.urlJobSkills = "http://localhost:55187/api/JobSkills";//DB skillsForJob
    this.headers = new Headers({ 'Accept': 'application/json' })
  }


  Get() {
    return this.http.get(this.url);
  }
  GetSkillSet() {
    return this.http.get(this.urlSkillSet);
  }
  GetReccruitersManager(){
    return this.http.get(this.urlReccruitersManager);
  }  
    GetRecruiterJobs(id: number, name: string, email: string,
    password: string, userType: string) {
    let url = this.url;
    let body = { Id: id, Name: name, Email: email, Password: password,
                 UserType: userType };
    return this.http.patch(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  addJob(userId: number,uniqueID:string, name: string,position:string, description: string,
    YearsExperience:number, requirements: string, isActive: boolean) {
    debugger;
    let url = this.url;
    let body = { UserId: userId,strUniqueID: uniqueID, Name: name,Position: position, Description: description,
    YearOfExperience:YearsExperience,Requirements: requirements, IsActive: isActive};

    return this.http.post(url, body, this.headers).map((res) => {
      return res.json();
    });
  }
  addSkillsetForJob(id:number,ListSkillForJob:number[]){
     let url = this.urlJobSkills;
    // var skillset:number[] = [1,2];
    let body = { Id: id,Skills: ListSkillForJob};
    debugger;
    return this.http.post(url, body, this.headers).map((res) => {
      return res.json();
    });
  }


  
  

 



 //   job.Position = j.Position;
     
          //   job.YearOfExperience = j.YearOfExperience;
  editJob(Id: number, userId: number,strUniqueID:string, name: string, 
    position:string,description: string, requirements: string, 
    isActive: boolean,YearOfExperience:number) {
        debugger;
    let url = this.url + "/" + Id;
    let body = { id: Id, UserId: userId,strUniqueID:strUniqueID, Name: name, Position:position,
     Description: description,Requirements: requirements, IsActive: isActive,YearOfExperience:YearOfExperience,
   };

    return this.http.put(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  deleteJob(job: any) {
    let url = this.url + "/" + job.Id;
    return this.http.delete(url, this.headers).map((res) => {
      return res.json()
    });
  }
}
