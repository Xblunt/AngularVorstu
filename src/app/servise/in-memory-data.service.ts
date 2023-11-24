import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const students = [
      {id: 0, name: 'Andr', surname: 'andr'},
      {id: 1, name: 'rrr', surname: 'rrr'},
      {id: 2, name: 'bbbbbb', surname: 'vvv'},
      {id: 3, name: 'vvv', surname: 'vvv'},
      {id: 4, name: 'vvv', surname: 'vvv'},
      {id: 5, name: 'vvv', surname: 'vvv'},
      {id: 6, name: 'vvv', surname: 'vvv'},
      {id: 7, name: 'xxx', surname: 'xxx'}
    ];
    return {students};
  }

  genId(students: Student[]): number {
    return students.length > 0 ? Math.max(...students.map(student => student.user_id)) + 1 : 11;
  }
}
