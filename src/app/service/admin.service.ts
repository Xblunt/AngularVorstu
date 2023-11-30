import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Student } from '../models/student';
import { Page } from '../service/page';
import { Observable } from 'rxjs';
import { IbaseServiceService } from './ibase-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends IbaseServiceService {
  private  adminUrl = 'admin/users';

  constructor(http: HttpClient) {
    super(http, 'api');
  }

  getAllUsers(page: number, size: number, sortColumn: string, sortDirection: string): Observable<Page<Student>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set("sortColumn", sortColumn)
      .set("sortDirection", sortDirection);
    return this.get<Page<Student>>(this.adminUrl, params);
  }

  addNewUser(student: Student): Observable<Student> {
    console.log('addNewStudent');
    return this.post<Student>(this.adminUrl, student);
  }

  editUser(student: Student): Observable<Student> {
    console.log('editStudent');
    return this.put<Student>(`${this.adminUrl}/${student.user_id}`, student);
  }

  deleteUser(student: Student): Observable<Student> {
    console.log(student.user_id);
    return this.delete<Student>(`${this.adminUrl}/${student.user_id}`);
  }
}
