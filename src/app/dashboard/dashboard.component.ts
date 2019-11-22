import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EditService, PageService, ToolbarService, GridComponent, IEditCell, SortService, CommandModel, CommandColumnService, FilterService, SelectionService } from '@syncfusion/ej2-angular-grids';
import { ComputerService } from 'app/service/computer.service';
import { checkComputer } from 'app/validator/computer-validator';
import { CompanyService } from 'app/service/company.service';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService, FilterService, SelectionService]
})
export class DashboardComponent implements OnInit {


  public datasource: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public orderidrules: Object;
  public customeridrules: Object;
  public freightrules: Object;
  public pageSettings: Object;
  public editparams: Object;
  public dateFormat: Object;
  public commands: CommandModel[];

  public companies: any[];

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

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', allowEditOnDblClick: false };
    // this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Delete', 'Update', 'Cancel', 'Search'];
    // this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    this.orderidrules = { required: true, number: true };
    this.customeridrules = { required: true };
    this.freightrules = { required: true };
    this.editparams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 5, pageSizes: true };

    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];


    this.dateFormat = { type: 'date', format: 'yyyy-MM-dd' }

    this.companyService.getCompanies().subscribe(
      data => {
        this.companies = data;
      },
      err => console.log("Error getting compaies: ", err),
      () => { }
    );


    this.companyParams = {
      create: () => {
        this.companyElem = document.createElement("input");
        return this.companyElem;
      },
      read: () => {
        return this.companyObj.value;
      },
      destroy: () => {
        this.companyObj.destroy();
      },
      write: () => {
        this.companyObj = new DropDownList({
          dataSource: this.companies,
          fields: { value: "id", text: "name" },
          enabled: true,
          placeholder: "Select a compnay...",
          floatLabelType: "Never",
          sortOrder: "Ascending"
        });
        this.companyObj.appendTo(this.companyElem);
      }
    }

    this.computerService.getComputers().subscribe(
      (data) => {

        data.forEach(computer => {
          this.arrangeComputer(computer);
        })
        this.datasource = data;
      },
      (err) => { },
      () => { }
    );

  }

  arrangeComputer(computer: any) {
    this.convertTimestamp(computer, "introduced");
    this.convertTimestamp(computer, "discontinued");

    const company: any = computer["company"];

    if (company) {
      computer["companyName"] = company.name;
    } else {
      computer["companyName"] = null;
    }
  }

  convertTimestamp(object: any, attribute: string): void {
    const timestamp = object[attribute];
    if (timestamp) {
      object[attribute] = new Date(timestamp)
    }
  }


  null_obj = {
    id: undefined,
    name: undefined,
    introduced: undefined,
    discontinued: undefined,
    company: undefined,
    companyName: undefined,
    companyid: undefined
  }

  actionBegin(event) {

    const action = event.action;
    const requestType = event.requestType;
    const computer = event.data;

    console.log("Action Begin");
    console.log(`action: ${event.action}, requestType: ${event.requestType}, type: ${event.type}`);
    console.log("Event details: ", event);
    console.log("                ");

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
        const computers = computer;
        const ids: number[] = computers.map(com => com["id"]);
        this.deleteComputers(ids, event);
        break;
      case "add":
        // Clear all the champs
        event.data = this.null_obj;
        break;
    }

  }

  addComputer(computer, event) {
    event.cancel = true;
    if (!checkComputer(computer)) {

      return;
    }
    computer["company"] = this.getCompanyFromName(computer.companyName)


    this.computerService.createComputer(computer).subscribe(
      () => alert("Add computer success!"),
      err => {
        alert("Add computer failure");
        console.log("Add computer failure: ", err);
      },
      () => this.refresh()
    );
  }

  getCompanyFromName(companyName: string) {
    if (!companyName) {
      return null;
    }
    return this.companies.find(company => company.name === companyName);
  }

  editComputer(computer, event) {
    event.cancel = true;
    if (!checkComputer(computer)) {
      return;
    }
    computer["company"] = this.getCompanyFromName(computer.companyName)
    this.computerService.updateComputer(computer).subscribe(
      () => alert("Update computer success!"),
      err => {
        alert("Update computer failure");
        console.log("Update computer failure: ", err);
      },
      () => this.refresh()
    );
  }

  deleteComputers(ids, event) {
    console.log("Delete computer called!", ids);
    event.cancel = true;
    this.computerService.deleteComputers(ids).subscribe(
      () => console.log("Delete computers success!"),
      err => console.log("Delete computers failure:", err),
      () => this.refresh()
    );
  }

  refresh() {
    this.router.navigateByUrl("dashboard");
  }

  deleteCompany(id, event) {

  }

  actionComplete(event) {
    // const action = event.action;
    // const requestType = event.requestType;
    // const computer = event.data;

    console.log("Action Complete");
    console.log(`action: ${event.action}, requestType: ${event.requestType}, type: ${event.type}`);
    console.log("Event details: ", event);
    console.log("                ");
  }
}