import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from 'src/app/model/department-model';
import { Observable, from } from 'rxjs';

import { Subject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor( private http:HttpClient ) { }

  formData: Department;

readonly APIUrl = "http://localhost:49902/api";

  getDepartmentList() : Observable<Department[]>{
    return this.http.get<Department[]>(this.APIUrl + '/department');
  }

  addDepartment(department:Department) {
    return this.http.post(this.APIUrl+'/Department', department)
  }

  deleteDepartment(id: number) {
    return this.http.delete(this.APIUrl+'/Department/'+id);
  }

  updateDepartment(department:Department) {
    return this.http.put(this.APIUrl+'/Department', department);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners. next(filterBy);
  }
}
