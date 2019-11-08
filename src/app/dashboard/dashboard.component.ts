import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ComputerService } from 'app/service/computer.service';
import { AddComputerComponent } from 'app/add-computer/add-computer.component';
import { Router } from '@angular/router';

import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { EditComputerComponent } from 'app/edit-computer/edit-computer.component';
import { Computer } from 'app/model/computer.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // displayedColumnsDeleteMode: string[] = ['delete', 'name', 'introduced', 'discontinued', 'company'];
  // displayedColumnsNormal: string[] = ['name', 'introduced', 'discontinued', 'company']

  displayedColumns: string[] = ['name', 'introduced', 'discontinued', 'company']

  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  dataSource: any;
  searchText: any;
  checked = false;
  deleteModeOn = false;

  constructor(
    private dialog: MatDialog,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private computerService: ComputerService,
    private router: Router) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.router.events.subscribe((evt) => {
      this.router.navigated = false;
    });

  }

  ngOnInit() {
    this.computerService.getComputers().subscribe(
      data => this.dataSource = data,
      err => console.log('err: ', err),
      () => console.log('Completed'),
    )
  }

  // getDisplayedColumns() {
  //   return this.deleteModeOn ? this.displayedColumnsDeleteMode : this.displayedColumnsNormal;
  // }

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
    this.deleteModeOn = !this.deleteModeOn;
  }

  search() {

    this.computerService.getComputersByName(this.searchText).subscribe(
      (data) => this.dataSource = data,
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
