import { Student } from './../../../../firstApp/src/app/models/student';

export class Page<Student> {
  content: Student[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
  number: number;
  constructor(content: Student[], totalPages: number, totalElements: number, size: number, number: number) {
    this.content = content;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.size = size;
    this.number = number;
  }
}

