import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class ApplicantService {
  private url: string;
  private urlSkillApplicant: string;
  private urlInterviewSummary: string;
  private urlSkillset: string;

  headers: any;

  constructor( @Inject(Http) private http: Http) {
    this.url = "http://localhost:55187/api/Applicant";
    this.urlSkillApplicant = "http://localhost:55187/api/SkillsOfAnApplicant";
    this.urlInterviewSummary = "http://localhost:55187/api/InterviewSummary";
    this.urlSkillset = "http://localhost:55187/api/Skillsets";
    this.headers = new Headers({ 'Accept': 'application/json' })
  }


  GetApplicantSkills(id: number) {
    let url = this.urlSkillApplicant + "/" + id;
    return this.http.get(url);
  }


  Get() {
    return this.http.get(this.url);
  }
  GetOneApplicant(id: number) {
    let url = this.url + "/" + id;
    return this.http.get(url);
  }

  GetRecruiterApplicants(id: number, name: string, email: string,
    password: string, userType: string) {
    let url = this.url;
    let body = { Id: id, Name: name, Email: email, Password: password,
                  UserType: userType };
    return this.http.patch(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  addApplicant(name: string, title: string, email: string,
    cv: string, phone: string, experience: number, position: string) {

    let url = this.url;
    let body = {
      Name: name,
      Title: title,
      Email: email,
      Cv: cv,
      Phone: phone
      , YearOfExperience: experience,
      Position: position,
    };

    return this.http.post(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  editApplicant(Id: number, name: string, title: string, phone: string,
    email: string, experience: number, position: string, cv: string,
    isLocked: boolean, userIdLockedBy: number, nameWhoLocked:string, 
    isPublished: boolean, isActive: boolean, interviewDate: string, 
    statusAfterInterview: string) {

    let url = this.url + "/" + Id;
    let body = {
      id: Id, Name: name, Title: title, Phone: phone, Email: email,
      YearOfExperience: experience, Position: position, Cv: cv,
      IsLocked: isLocked, UserIdLockedBy: userIdLockedBy, NameWhoLocked: nameWhoLocked,
      IsPublished: isPublished, IsActive: isActive, InterviewDate: interviewDate,
      StatusAfterInterview: statusAfterInterview
    };

    return this.http.put(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  deleteApplicant(applicant: any) {
    let url = this.url + "/" + applicant.Id;
    return this.http.delete(url, this.headers).map((res) => {
      return res.json()
    });
  }


  addSkillset(skillset: string) {
    let url = this.urlSkillset;
    let body = { skill: skillset };
    //debugger;
    return this.http.post(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  addApplicantSkills(Id: number, skillset: any) {
    let url = this.urlSkillApplicant;
    let body = { Id: Id, Skills: skillset };
    return this.http.post(url, body, this.headers).map((res) => {
      return res.json();
    });
  }


  addInterviewSummary(userId: number, applicantId: number, summary: string) {

    let url = this.urlInterviewSummary;
    let body = { UserId: userId, ApplicantId: applicantId, Summary: summary };

    return this.http.post(url, body, this.headers).map((res) => {
      return res.json();
    });
  }
  // addSInterviewSummary(summary:string, applicantId:number){
  //   let url = this.urlInterviewSummary;
  //   let body = { Summary: summary,ApplicantId: applicantId};
  // return this.http.post(url , body, this.headers).map((res) => {
  //     return res.json();
  //   });
  // }
}
