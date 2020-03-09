import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { EmployeeComponent } from './employee/employee.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { DepartmentComponent } from './department/department.component';
import { ViewDepartmentComponent } from './department/view-department/view-department.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { UpdateDepartmentComponent } from './department/update-department/update-department.component';

import { DepartmentService } from './service/department.service';
import { EmployeeService } from './service/employee.service';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ViewEmployeeComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    DepartmentComponent,
    ViewDepartmentComponent,
    AddDepartmentComponent,
    UpdateDepartmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    DepartmentService,
    EmployeeService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddDepartmentComponent, UpdateDepartmentComponent, AddEmployeeComponent, UpdateEmployeeComponent]
})
export class AppModule { }
