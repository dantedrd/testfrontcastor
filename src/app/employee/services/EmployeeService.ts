import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
/**
 * Service that handles operations related to mathematical challenges.
 */
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
 

  /**
   * Base URL for the employee api service.
   */
  public basePath: string;




  constructor(private http: HttpClient) {
    console.log(environment)
    this.basePath = environment.basePath;
  }


  getEmployees(): Observable<any> {
    return this.http.get<any>(`${this.basePath}${environment.employeePath}`);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(`${this.basePath}${environment.employeePath}`,employee);
  }

  deleteEmployee(employeeId: any): Observable<any> {
    return this.http.post<any>(`${this.basePath}${environment.employeePath}/${employeeId}`,{});
  }

  getPositions(): Observable<any> {
    return this.http.get<any>(`${this.basePath}${environment.postionPath}`);
  }
}
