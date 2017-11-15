import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class ApplicantService {
  private url: string;
  private urlSkillApplicant: string;
  headers: any;

  constructor( @Inject(Http) private http: Http) {
    this.url = "http://localhost:55187/api/Applicant";
    this.urlSkillApplicant = "http://localhost:55187/api/SkillsOfAnApplicant";
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
  addApplicant(name: string, title: string, 
    cv: string, message: string, isLocked: boolean, userIdLockedBy: number,
    isPublished: boolean, isActive: boolean) {

    let url = this.url;
    let body = {
      Name: name, Title: title, Cv: cv,
      IsLocked: isLocked, UserIdLockedBy: userIdLockedBy,
      IsPublished: isPublished, IsActive: isActive
    };

    return this.http.post(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  editApplicant(Id: number, name: string, title: string,
    cv: string, message: string, isLocked: boolean, userIdLockedBy: number,
    isPublished: boolean, isActive: boolean) {

    let url = this.url + "/" + Id;
    let body = {
      id: Id, Name: name, Title: title,Cv: cv,
      IsLocked: isLocked, UserIdLockedBy: userIdLockedBy,
      IsPublished: isPublished, IsActive: isActive
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
}
