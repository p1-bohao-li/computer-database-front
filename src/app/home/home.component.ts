import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	title = 'Example of Angular 8 DataTable';
	dtOptions: DataTables.Settings = {};
	dtUsers = [
		{ "id": 101, "firstName": "Anil", "lastName": "Singh" },
		{ "id": 102, "firstName": "Reena", "lastName": "Singh" },
		{ "id": 103, "firstName": "Aradhay", "lastName": "Simgh" },
		{ "id": 104, "firstName": "Dilip", "lastName": "Singh" },
		{ "id": 105, "firstName": "Alok", "lastName": "Singh" },
		{ "id": 106, "firstName": "Sunil", "lastName": "Singh" },
		{ "id": 107, "firstName": "Sushil", "lastName": "Singh" },
		{ "id": 108, "firstName": "Sheo", "lastName": "Shan" },
		{ "id": 109, "firstName": "Niranjan", "lastName": "R" },
		{ "id": 110, "firstName": "Lopa", "lastName": "Mudra" },
		{ "id": 111, "firstName": "Paramanand", "lastName": "Tripathi" }
	];
	ngOnInit(): void {
		this.dtOptions = {
			data: this.dtUsers,
			columns: [{ title: 'User ID', data: 'id' },
			{ title: 'First Name', data: 'firstName' },
			{ title: 'Last Name', data: 'lastName' }]
		};
	}

}

