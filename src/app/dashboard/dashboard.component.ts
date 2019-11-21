import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EditService, PageService, ToolbarService, GridComponent, IEditCell } from '@syncfusion/ej2-angular-grids';
import { ComputerService } from 'app/service/computer.service';
import { checkComputer } from 'app/validator/computer-validator';
import { CompanyService } from 'app/service/company.service';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ToolbarService, EditService, PageService]
})
export class DashboardComponent implements OnInit {


  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public orderidrules: Object;
  public customeridrules: Object;
  public freightrules: Object;
  public pageSettings: Object;
  public editparams: Object;
  public dateFormat: Object;

  // Attributes for the company dropdown list
  public companyParams: IEditCell;
  public companyElem: HTMLElement;
  public companyObj: DropDownList;

  @ViewChild("myGrid", { static: false })
  public grid: GridComponent;

  constructor(
    private computerService: ComputerService,
    private router: Router,
    private companyService: CompanyService) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.router.events.subscribe((evt) => {
      this.router.navigated = false;
    });

  }

  ngOnInit(): void {

    this.dateFormat = { type: 'date', format: 'yyyy-MM-dd' }

    this.companyService.getCompanies().subscribe(
      data => {
        data = data.sort();
        this.companyParams = {
          create: () => {
            this.companyElem = document.createElement("input");
            return this.companyElem;
          },
          read: () => {
            return this.companyObj.text;
            // if (this.companyObj.value) {
            //   return { id: this.companyObj.value, name: this.companyObj.text }
            // } else {
            //   return null;
            // };
          },
          destroy: () => {
            this.companyObj.destroy();
          },
          write: () => {
            this.companyObj = new DropDownList({
              dataSource: data,
              fields: { value: "id", text: "name" },
              enabled: true,
              placeholder: "Select a compnay...",
              floatLabelType: "Never",
              sortOrder: "Ascending"
            });
            this.companyObj.appendTo(this.companyElem);
          }
        }
      },
      err => console.log("Error getting compaies: ", err),
      () => { }
    );

    this.computerService.getComputers().subscribe(
      (data) => {

        this.data = data;
        this.data.forEach(computer => {
          this.arrangeComputer(computer);
        })
        // this.data = data;
      },
      (err) => { },
      () => { }
    );

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    // this.toolbar = ['Add', 'Edit', 'Delete', 'Search'];
    this.toolbar = ['Add', 'Edit', 'Delete', 'Search'];
    // this.orderidrules = { required: true, number: true };
    this.orderidrules = { required: true, number: true };
    this.customeridrules = { required: true };
    this.freightrules = { required: true };
    this.editparams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 5 };

  }

  arrangeComputer(computer: any) {
    this.convertTimestamp(computer, "introduced");
    this.convertTimestamp(computer, "discontinued");

    const companyModel: any = computer["companyModel"];

    if (companyModel) {
      computer["company"] = companyModel.name
    }
  }

  convertTimestamp(object: any, attribute: string): void {
    const timestamp = object[attribute];
    if (timestamp) {
      // const date = new Date(timestamp)
      // object[attribute] = date.toISOString().slice(0, 10);


      object[attribute] = new Date(timestamp)
      // object[attribute] = new Date(836505e6)
    }
  }


  null_obj = {
    id: undefined,
    name: undefined,
    introduced: undefined,
    discontinued: undefined,
    company: undefined
  }

  actionBegin(event) {

    // console.log("Action completed: ", event);
    // console.log("Complete data length: ", this.grid.dataSource["length"]);
    // console.log("                ");

    const action = event.action;
    const requestType = event.requestType;
    const computer = event.data;

    switch (requestType) {
      case "save":
        if (action === "add") {
          this.addComputer(computer, event);
        }
        if (action === "edit") {
          this.editComputer(computer, event);
        }
        break;
      case "delete":
        this.deleteComputer(computer[0]["id"], event);
        break;
      case "add":
        // Clear all the champs
        event.data = this.null_obj;
        break;
    }


    // event.rowData = this.null_obj;
    // console.log(`action: ${event.action}, requestType: ${event.requestType}, type: ${event.type}`);
    // console.log(event);
  }

  addComputer(computer, event) {
    if (!checkComputer(computer)) {
      event.cancel = true;
      return;
    }

    console.log("The computer to be added: ", computer);
    console.log("The add event: ", event);

    // this.computerService.createComputer(computer).subscribe(
    //   () => console.log("Add computer success!"),
    //   err => console.log("Add computer failure:", err),
    //   () => this.refresh()
    // );
  }

  editComputer(computer, event) {
    if (!checkComputer(computer)) {
      event.cancel = true;
      return;
    }

    console.log("The computer to be edited: ", computer);
    // this.computerService.updateComputer(computer).subscribe(
    //   () => console.log("Update computer success!"),
    //   err => console.log("Update computer failure:", err),
    //   () => this.refresh()
    // );
  }

  deleteComputer(id, event) {
    this.computerService.deleteComputer(id).subscribe(
      () => console.log("Delete computer success!"),
      err => console.log("Delete computer failure:", err),
      () => this.refresh()
    );
  }

  refresh() {
    this.router.navigateByUrl("dashboard");
  }

  deleteCompany() {

  }

  actionComplete(event) {
    // console.log("Action Begin: ", event);
    // console.log("Begin data length: ", this.grid.dataSource["length"]);
    // console.log("                ");
  }
}