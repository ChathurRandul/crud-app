import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
//import { MatTableDataSource, MatSort } from '@angular/material';
import { Department } from 'src/app/model/department-model';
import { DepartmentService } from 'src/app/service/department.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDepartmentComponent } from 'src/app/department/add-department/add-department.component';

import { MatSnackBar } from '@angular/material/snack-bar'
import { UpdateDepartmentComponent } from '../update-department/update-department.component';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent implements OnInit {

  constructor(private service: DepartmentService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar) { 
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshDepartmentList();
      })
     }

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['options', 'DepartmentID', 'DepartmentName']

@ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.refreshDepartmentList();
  }

  refreshDepartmentList(){
   
    this.service.getDepartmentList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
    
  }

  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLocaleLowerCase();
  }

  onEdit(department: Department){
    this.service.formData = department;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(UpdateDepartmentComponent, dialogConfig);
  }

  onDelete(id: number){
    if(confirm('Are sure to delete this Department?')){
      this.service.deleteDepartment(id).subscribe(response=>{
        this.refreshDepartmentList();
        this.snackBar.open(response.toString(), '', {
          duration:5000,
          verticalPosition:'top'
        });
      });
    }
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddDepartmentComponent, dialogConfig);
  }

}
