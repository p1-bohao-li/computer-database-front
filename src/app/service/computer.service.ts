import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Computer } from 'app/model/computer.model';
import { environment } from 'environments/environment';
import { getHashes } from 'crypto';

const backend_url = environment.backend_url;
const username = environment.username;
const password = environment.password;

@Injectable({
	providedIn: 'root'
})
export class ComputerService {

	headers: HttpHeaders;

	constructor(private http: HttpClient) {
		this.headers = new HttpHeaders();
		this.headers = this.headers.append('Content-Type', 'application/json');
		this.headers = this.headers.append("Authorization", "Basic " + btoa(`${username}:${password}`));
	}



	getComputers(): Observable<any> {
		return this.http.get(`${backend_url}/computer/get-all`, { headers: this.headers })
	}

	createComputer(computer: any): Observable<any> {
		return this.http.post(`${backend_url}/computer/create`, computer, { headers: this.headers });
	}

	getComputersByName(name: string): Observable<any> {
		return this.http.get(`${backend_url}/computer/find-by-name/${name}`, { headers: this.headers })
	}

	updateComputer(computer: any): Observable<any> {
		return this.http.post(`${backend_url}/computer/update`, computer, { headers: this.headers });
	}
}
