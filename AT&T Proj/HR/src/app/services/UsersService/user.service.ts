import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private url: string;
  headers: any;

  constructor( @Inject(Http) private http: Http) {
    this.url = "http://localhost:55187/api/User";
    this.headers = new Headers({ 'Accept': 'application/json' })
  }

  Get() {
    return this.http.get(this.url);
  }
      GetOneUser(id: number) {
        let url = this.url + "/" + id;
        return this.http.get(url);
    }

  addUser(name: string, email: string, password: string, userType: string) {

    let url = this.url;
    let body = { Name: name, Email: email, Password: password, UserType: userType };

    return this.http.post(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  editUser(Id: number, name: string, email: string, password: string, userType: string) {

    let url = this.url + "/" + Id;
    let body = { id: Id, Name: name, Email: email, Password: password, UserType: userType };

    return this.http.put(url, body, this.headers).map((res) => {
      return res.json();
    });
  }

  deleteUser(user: any) {
    let url = this.url + "/" + user.Id;
    return this.http.delete(url, this.headers).map((res) => {
      return res.json()
    });
  }

  UserConfirmation(email: string, password: string) {
    let url = this.url + "?Email=" + email + "&Password=" + password;
    return this.http.get(url, this.headers).map((res) => {
      return res.json()
    });
  }
}