import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CompanyService } from '../service/company.service';
import { Company } from 'app/model/company.model';
import { ComputerService } from 'app/service/computer.service';
import { checkComputer } from 'app/validator/computer-validator';
import { Computer } from 'app/model/computer.model';

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.scss']
})
export class AddComputerComponent implements OnInit {

  form: FormGroup;
  companies: Company[];
  createComputerEvent = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddComputerComponent>,
    private companyService: CompanyService,
    private computerService: ComputerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.companyService.getCompanies().subscribe(
      data => this.companies = data,
      err => console.log("Error happend when getting all companies! Error: ", err),
      () => console.log("Getting all companies completed."),
    )
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      introduced: [''],
      discontinued: [''],
      company: [this.companies]
    })
  }

  save() {
    const computer: Computer = this.dealWithFormData(this.form.value)
    if (!checkComputer(computer)) {
      return
    }
    this.createComputer(computer)
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }


  dealWithFormData(computerToBeCloned: Computer): Computer {

    const computer = Object.assign({}, computerToBeCloned);

    if (computer.hasOwnProperty("company")) {
      const company = this.companies.find((c: any) => c.id == computer["company"])
      computer["companyModel"] = company
    }
    delete computer["company"]

    return computer
  }

  convertTimestamp(object: any, attribute: string): void {
    const timestamp = object[attribute];
    if (timestamp) {
      const date = new Date(timestamp)
      object[attribute] = date.getTime();
    }
  }

  createComputer(computer: any) {
    this.computerService.createComputer(computer).subscribe(
      data => {
        console.log('Success creating computer! ');
        this.close(true);
      },
      err => {
        console.log('Failure creating computer!');
        this.close(false)
      },
      () => console.log('Creating computer completed!'),
    )
  }
}
