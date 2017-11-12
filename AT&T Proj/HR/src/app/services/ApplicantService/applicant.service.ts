import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class ApplicantService {
  private url: string;
  headers: any;

  constructor( @Inject(Http) private http: Http) {
    this.url = "http://localhost:61641/api/Applicant";
    this.headers = new Headers({ 'Accept': 'application/json' })
  }


  Get() {
    return this.http.get(this.url);
  }

  addApplicant(name: string, title: string, skillset: string,
    cv: string, message: string, isLocked: boolean, userIdLockedBy: number,
    isPublished: boolean, isActive: boolean) {

    let url = this.url;
    let body = {
      Name: name, Title: title, Skillset: skillset, Cv: cv,
      IsLocked: isLocked, UserIdLockedBy: userIdLockedBy,
      IsPublished: isPublished, IsActive: isActive
    };

    return this.http.post(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  editApplicant(Id: number, name: string, title: string, skillset: string,
    cv: string, message: string, isLocked: boolean, userIdLockedBy: number,
    isPublished: boolean, isActive: boolean) {

    let url = this.url + "/" + Id;
    let body = {
      id: Id, Name: name, Title: title, Skillset: skillset, Cv: cv,
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