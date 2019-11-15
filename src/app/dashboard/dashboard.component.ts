import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ComputerService } from 'app/service/computer.service';
import { AddComputerComponent } from 'app/add-computer/add-computer.component';
import { Router } from '@angular/router';

import { EditComputerComponent } from 'app/edit-computer/edit-computer.component';
import { Computer } from 'app/model/computer.model';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  searchText: any;
  checked = false;
  deleteModeOn = false;


  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  computers: Observable<Computer[]>;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private dialog: MatDialog,
    private computerService: ComputerService,
    private router: Router) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.router.events.subscribe((evt) => {
      this.router.navigated = false;
    });

  }


  test: any = [
    {
      id: 1,
      name: "cousin",
      introduced: "cousin",
      discontinued: "cousin"
    },
    {
      id: 1,
      name: "cousin",
      introduced: "cousin",
      discontinued: "cousin"
    },
    {
      id: 1,
      name: "cousin",
      introduced: "cousin",
      discontinued: "cousin"
    },
    {
      id: 1,
      name: "cousin",
      introduced: "cousin",
      discontinued: "cousin"
    },
  ]

  ngOnInit() {

    this.computerService.getComputers().subscribe(
      (data) => {
        this.computers = data;
        this.dtTrigger.next();
      });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [],
      data: this.test,
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Name',
        data: 'name'
      }, {
        title: 'Introduced',
        data: 'introduced'
      }, {
        title: 'Discontinued',
        data: 'discontinued'
      }
      ],
      columnDefs: [
        { targets: 0, visible: false }
      ],
      buttons: [
        'columnsToggle'
      ]
    };

  }

  addComputer() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddComputerComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          alert('You get it.')
        } else {
          alert('Failure')
        }
      }, () => { }, () => { this.router.navigateByUrl("/dashboard") });
  }

  toggleDeleteMode() {
    // console.log("Toggle delete mode called");
    // this.deleteModeOn = !this.deleteModeOn;
    // let table = $("#example").DataTable();
    // table.column(0).visible(true)

    // console.log("visible?: ", table.column(0));
  }

  search() {

    this.computerService.getComputersByName(this.searchText).subscribe(
      (data) => this.computers = data,
      (err) => console.log("Getting computers by name failure!"),
      () => console.log("Getting computers by name completed.")
    );
  }

  editComputer(computer: Computer) {

    console.log("The computer passed is", computer);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = { computer }

    const dialogRef = this.dialog.open(EditComputerComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          alert('You get it.')
        } else {
          alert('Edit computer failure.')
        }
      }, () => { }, () => { this.router.navigateByUrl("/dashboard") });

  }
}
