import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Computer } from 'app/model/computer.model';
import { checkComputer } from 'app/validator/computer-validator';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.scss']
})
export class DeleteCompanyComponent implements OnInit {

  form: FormGroup;
  companies: any;

  constructor(
    public dialogRef: MatDialogRef<DeleteCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.companies = this.data["companies"]

    this.form = this.fb.group({
      company: [this.companies]
    })
  }



  save() {
    this.dialogRef.close(this.form.value);
  }

  close(result: boolean) {
    this.dialogRef.close({ company: null });
  }
}
