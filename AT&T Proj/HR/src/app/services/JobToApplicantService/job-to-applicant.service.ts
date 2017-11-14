import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class JobToApplicantService {
  private url: string;
  headers: any;

  constructor( @Inject(Http) private http: Http) {
    this.url = "http://localhost:55187/api/JobToApplicant";
    this.headers = new Headers({ 'Accept': 'application/json' })
  }

  Get() {
    return this.http.get(this.url);
  }

  addJobToApplicant(jobId: number, applicantId: number) {

    let url = this.url;
    let body = { JobId: jobId, ApplicantId: applicantId };

    return this.http.post(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  editJobToApplicant(Id: number, jobId: number, applicantId: number) {

    let url = this.url + "/" + Id;
    let body = { id: Id, JobId: jobId, ApplicantId: applicantId };

    return this.http.put(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  deleteJobFromApplicant(JobToApplicant: any) {
    let url = this.url + "/" + JobToApplicant.Id;
    return this.http.delete(url, this.headers).map((res) => {
      return res.json()
    });
  }
}
