import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/service/department.service';
import { NgForm } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<UpdateDepartmentComponent>,
    public service:DepartmentService,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('Register click');
    }

  onSubmit(form:NgForm){
      this.service.updateDepartment(form.value).subscribe(response =>{
          this.snackBar.open(response.toString(),'',{
            duration:5000,
            verticalPosition:'top'
          });
      });
    }

}
