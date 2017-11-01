import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class JobService {
  private url: string;
  headers: any;

  constructor( @Inject(Http) private http: Http) {
    this.url = "http://localhost:61641/api/Job";
    this.headers = new Headers({ 'Accept': 'application/json' })
  }


  Get() {
    return this.http.get(this.url);
  }

  addJob(userId: number, name: string, description: string, skillset: string, 
    requirements: string, isActive: boolean) {

    let url = this.url;
    let body = { UserId: userId, Name: name, Description: description, Skillset: skillset,
    Requirements: requirements, IsActive: isActive};

    return this.http.post(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  editJob(Id: number, userId: number, name: string, description: string, skillset: string, 
    requirements: string, isActive: boolean) {

    let url = this.url + "/" + Id;
    let body = { id: Id, UserId: userId, Name: name, Description: description, Skillset: skillset,
    Requirements: requirements, IsActive: isActive};

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
