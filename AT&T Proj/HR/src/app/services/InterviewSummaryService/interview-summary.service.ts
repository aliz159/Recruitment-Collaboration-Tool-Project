import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class InterviewSummaryService {
  private url: string;
  headers: any;

  constructor( @Inject(Http) private http: Http) {
    this.url = "http://localhost:55187/api/InterviewSummary";
    this.headers = new Headers({ 'Accept': 'application/json' })
  }

  Get() {
    return this.http.get(this.url);
  }

  addInterviewSummary(userId: number, applicantId: number, summary: string) {

    let url = this.url;
    let body = { UserId: userId, ApplicantId: applicantId, Summary: summary };

    return this.http.post(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  editInterviewSummary(Id: number, userId: number, applicantId: number, summary: string) {

    let url = this.url + "/" + Id;
    let body = { id: Id, UserId: userId, ApplicantId: applicantId, Summary: summary };

    return this.http.put(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  deleteInterviewSummary(summary: any) {
    let url = this.url + "/" + summary.Id;
    return this.http.delete(url, this.headers).map((res) => {
      return res.json()
    });
  }
}
