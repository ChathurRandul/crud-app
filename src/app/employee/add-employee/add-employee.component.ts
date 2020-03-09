import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/service/employee.service';
import { NgForm } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddEmployeeComponent>,
    public service:EmployeeService,
    private snackBar:MatSnackBar) { }

    public departmentList: Array<string> = [];

  ngOnInit(): void {
    this.resetForm();
    this.dropdownRefresh();
  }

  dropdownRefresh(){
    this.service.getDepartmentList().subscribe(data=>{
      data.forEach(element => {
        console.log(data);
        this.departmentList.push(element["DepartmentName"]);
      });
    })
  }

  resetForm(form?:NgForm) {
    if(form!=null)
    form.resetForm();

    this.service.formData = {
      EmployeeID:0,
      EmployeeName:'',
      Department:'',
      MailID:'',
      DOJ:null
    }
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('Register click');
    }

  onSubmit(form:NgForm) {
    this.service.addEmployee(form.value).subscribe(response => {
      this.resetForm(form);
      this.snackBar.open(response.toString(), '', {
        duration:5000,
        verticalPosition:'top'
      });
    })
  }


}
