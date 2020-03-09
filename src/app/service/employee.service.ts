import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/model/employee-model';
import { Observable, from } from 'rxjs';

import { Subject } from 'rxjs';
import { Department } from '../model/department-model';
 
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private http:HttpClient ) { }

  formData: Employee;

readonly APIUrl = "http://localhost:49902/api";

  getEmployeeList() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.APIUrl + '/employee');
  }

  addEmployee(employee:Employee) {
    return this.http.post(this.APIUrl+'/Employee', employee)
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.APIUrl+'/Employee/'+id);
  }

  updateEmployee(employee:Employee) {
    return this.http.put(this.APIUrl+'/Employee', employee);
  }

  getDepartmentList():Observable<any>{
    return this.http.get<Department[]>(this.APIUrl+'/Department');
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners. next(filterBy);
  }
}
