import { Component, OnInit, Input, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Computer } from 'app/model/computer.model';
import { Company } from 'app/model/company.model';
import { CompanyService } from 'app/service/company.service';
import { ComputerService } from 'app/service/computer.service';
import { checkComputer } from 'app/validator/computer-validator';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.scss']
})
export class EditComputerComponent implements OnInit {

  computer: Computer;
  form: FormGroup;
  companies: Company[];
  editComputerEvent = new EventEmitter<boolean>();
  selectedCompanyId: number;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditComputerComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private companyService: CompanyService,
    private computerService: ComputerService, ) {

    this.companyService.getCompanies().subscribe(
      data => this.companies = data,
      err => console.log("Error happend when getting all companies! Error: ", err),
      () => console.log("Getting all companies completed."),
    )

    this.computer = data.computer;
    const companyModel = data.computer.companyModel;
    this.selectedCompanyId = companyModel && companyModel.id;
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.computer.name, Validators.required],
      introduced: [this.getDate(this.computer.introduced)],
      discontinued: [this.getDate(this.computer.discontinued)],
      company: [this.selectedCompanyId]
    })
  }

  getDate(timestamp: number) {
    if (timestamp) {
      return new Date(timestamp).toISOString().slice(0, 10);
    } else {
      return undefined
    }
  }


  save() {
    console.log("The form value is: ", this.form.value);
    const computer = this.dealWithFormData(this.form.value)
    if (!checkComputer(computer)) {
      return
    }
    computer["id"] = this.computer.id
    this.updateComputer(computer)
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

  dealWithFormData(computerToBeCloned: any) {
    const computer = Object.assign({}, computerToBeCloned);

    if (computer.hasOwnProperty("company")) {
      const company = this.companies.find((c: any) => c.id == computer.company)
      computer["companyModel"] = company
    }
    delete computer["company"]

    return computer
  }

  updateComputer(computer: Computer): void {
    this.computerService.updateComputer(computer).subscribe(
      data => {
        console.log('Success updating computer! ');
        this.close(true);
      },
      err => {
        console.log('Failure updating computer!');
        this.close(false)
      },
      () => console.log('Updating computer completed!'),
    )
  }
}
