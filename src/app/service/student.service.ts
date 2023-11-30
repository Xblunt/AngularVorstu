import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { IbaseServiceService } from './ibase-service.service';
import { Page } from '../service/page';
@Injectable({
  providedIn: 'root'
})
export class StudentService extends IbaseServiceService {
  private  studentsUrl = 'home/users';

  constructor(http: HttpClient) {
    super(http, 'api');
  }


  getAllUsers(page: number, size: number, sortColumn: string, sortDirection: string): Observable<Page<Student>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set("sortColumn", sortColumn)
      .set("sortDirection", sortDirection);
    return this.get<Page<Student>>(this.studentsUrl, params);
  }
}
