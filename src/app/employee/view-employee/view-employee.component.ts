import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/model/employee-model';
import { EmployeeService } from 'src/app/service/employee.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEmployeeComponent } from 'src/app/employee/add-employee/add-employee.component';

import { MatSnackBar } from '@angular/material/snack-bar'
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  constructor(private service: EmployeeService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar) { 
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshEmployeeList();
      })
     }

     listData : MatTableDataSource<any>;
     displayedColumns : string[] = ['options', 'EmployeeID', 'EmployeeName', 'Department', 'MailID', 'DOJ']
   
   @ViewChild(MatSort) sort: MatSort;
   
     ngOnInit(): void {
       this.refreshEmployeeList();
     }
   
     refreshEmployeeList(){
   
       this.service.getEmployeeList().subscribe(data => {
         this.listData = new MatTableDataSource(data);
         this.listData.sort = this.sort;
       });
       
     }
   
     applyFilter(filterValue: string) {
       this.listData.filter = filterValue.trim().toLocaleLowerCase();
     }
   
     onEdit(employee: Employee){
       this.service.formData = employee;
       const dialogConfig = new MatDialogConfig();
       dialogConfig.disableClose = true;
       dialogConfig.autoFocus = true;
       dialogConfig.width = "70%";
       this.dialog.open(UpdateEmployeeComponent, dialogConfig);
     }
   
     onDelete(id: number){
       if(confirm('Are sure to delete this Employee?')){
         this.service.deleteEmployee(id).subscribe(response=>{
           this.refreshEmployeeList();
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
       this.dialog.open(AddEmployeeComponent, dialogConfig);
     }
   
   }
   