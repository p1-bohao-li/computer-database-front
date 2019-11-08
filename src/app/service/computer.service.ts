import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Computer } from 'app/model/computer.model';

@Injectable({
	providedIn: 'root'
})
export class ComputerService {

	constructor(private http: HttpClient) { }

	getComputers(): Observable<any> {
		return this.http.get("http://localhost:8080/computer-database/api/v1/computer/get-all")
	}

	createComputer(computer: any): Observable<any> {
		return this.http.post("http://localhost:8080/computer-database/api/v1/computer/create", computer);
	}

	getComputersByName(name: string): Observable<any> {
		return this.http.get(`http://localhost:8080/computer-database/api/v1/computer/find-by-name/${name}`)
	}

	updateComputer(computer: Computer): Observable<any> {
		return this.http.post("http://localhost:8080/computer-database/api/v1/computer/update", computer);
	}
}
