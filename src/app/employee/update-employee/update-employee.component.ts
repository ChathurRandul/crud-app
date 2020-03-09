import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/service/employee.service';
import { NgForm } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<UpdateEmployeeComponent>,
    public service:EmployeeService,
    private snackBar:MatSnackBar) { }

    public departmentList: Array<string> = [];

  ngOnInit(): void {
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

  onClose() {
    this.dialogbox.close();
    this.service.filter('Register click');
    }

  onSubmit(form:NgForm){
      this.service.updateEmployee(form.value).subscribe(response =>{
          this.snackBar.open(response.toString(),'',{
            duration:5000,
            verticalPosition:'top'
          });
      });
    }

}
