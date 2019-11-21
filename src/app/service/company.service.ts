import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

const backend_url = environment.backend_url;
const username = environment.username;
const password = environment.password;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append("Authorization", "Basic " + btoa(`${username}:${password}`));
  }

  getCompanies(): Observable<any> {
    return this.http.get(`${backend_url}/company/get-all`, { headers: this.headers })
  }
}
