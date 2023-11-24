import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/service/page';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {
  // students: Student[] = [
  //   {id: 0, name: 'Имя', surname: 'Фамилия'},
  //   {id: 1, name: 'Имя 1', surname: 'Фамилия 1'},
  //   {id: 2, name: 'Имя 2', surname: 'Фамилия 2'}
  // ];
  private studentsUrl = 'api/home';
  private adminUrl = 'api/admin';


  constructor(private http: HttpClient) { }
  // getAllStudents(): Student[] {
  //   console.log('count of students' + this.students.length);
  //   return this.students;
  // }
  // addNewStudent(student: Student): void {
  //   console.log('addNewStudent');
  //   this.students.push(student);
  // }

  // editStudent(student: Student): void {
  //   console.log('editStudent');
  //   this.students.splice(0,1);
  //   // alert(students);
  // }

//   nextPage(event: PageEvent) {
//     const params = new HttpParams()
//     .set('page', event.pageIndex.toString())
//     .set('size', event.pageSize.toString());
//     this.getAllStudents();
// }
// getAllStudents(page: number, size: number): Observable<Page<Student>> {
//   const params = new HttpParams()
//     .set('page', page.toString())
//     .set('size', size.toString());

//   return this.http.get<Page<Student>>(this.studentsUrl, { params });
// }


// nextPage(event: PageEvent) {
//   this.getAllStudents(event.pageIndex, event.pageSize)
//     .subscribe((page: Page<Student>) => {

//       console.log(page.content);
//     });
// }

getAllStudents(page: number, size: number): Observable<Page<Student>> {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())


  return this.http.get<Page<Student>>(this.studentsUrl + "/users", { params });
}
getAllStudentsAdmin(page: number, size: number): Observable<Page<Student>> {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())


  return this.http.get<Page<Student>>(this.adminUrl + "/users", { params });
}
// getAllStudents(): Observable<Student[]> {
//   return this.http.get<Student[]>(this.studentsUrl);
// }
  addNewStudent(student: Student): Observable<Student> {
    console.log('addNewStudent');
    return this.http.post<Student>(this.adminUrl, student).pipe();
  }
  editStudent(student: Student): Observable<Student> {
    console.log('editStudent');
    return this.http.put<Student>(this.adminUrl, student).pipe();
  }
  deleteStudent(student: Student): Observable<Student> {
    console.log(student.user_id);
    return this.http.delete<Student>(this.adminUrl + '/' + student.user_id).pipe();
  }
}
