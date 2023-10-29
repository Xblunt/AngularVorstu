import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { DialogEditWrapperComponent } from '../student-editor/components/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { DialogEditComponent } from '../student-editor/components/dialog-edit/dialog-edit.component';
import { DialogDeleteComponent } from '../student-editor/components/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.css']
})
export class TableStudentsComponent implements OnInit {

  students: Student[];

  constructor(private baseService: BaseServiceService, public dialog: MatDialog) { }

//   ngOnInit() {
//     this.students = [{id: 0, name: 'Имя', surname: 'Фамилия'},
//       {id: 1, name: 'Имя 1', surname: 'Фамилия 1'},
//       {id: 2, name: 'Имя 2', surname: 'Фамилия 2'}
//     ];
//     console.log("TableStudentsComponent");
//     this.students = this.baseService.getAllStudents();

//   }
//   addNewStudent() {
//     const dialogAddingNewStudent = this.dialog.open(DialogEditWrapperComponent, {
//       width: '700px',
//       data: null
//     });
//   }
//   editStudent() {
//     const dialogeditNewStudent = this.dialog.open(DialogEditComponent, {
//       width: '700px',
//       data: null
//     });

//  }

ngOnInit() {
  console.log("TableStudentsComponent");
  this.baseService.getAllStudents().subscribe(data => this.students = data);
}
addNewStudent() {
  const dialogAddingNewStudent = this.dialog.open(DialogEditWrapperComponent, {
    width: '700px',
    data: null
  });
  dialogAddingNewStudent.afterClosed().subscribe((result: Student) => {
    if(result != null) {
      console.log("adding new student: " + result.fio);
      this.baseService.addNewStudent(result).subscribe(k=>
        this.baseService.getAllStudents().subscribe(data => this.students = data) );
    }
  });
}
editStudent(student: Student) {
  const dialogAddingNewStudent = this.dialog.open(DialogEditComponent, {
    width: '700px',
    data: {id: student.id, fio: student.fio, group: student.group, phoneNumber: student.phoneNumber}
  });
  dialogAddingNewStudent.afterClosed().subscribe((student: Student) => {
    // debugger
    if(student != null) {
    // debugger
      console.log("edit student: " + student.fio);
      this.baseService.editStudent(student).subscribe(k=>
        this.baseService.getAllStudents().subscribe(data => this.students = data) );
    }
  });
}

deleteStudent(student: Student){
  const dialogAddingNewStudent = this.dialog.open(DialogDeleteComponent, {
    width: '700px',
    data: null
  });
  dialogAddingNewStudent.afterClosed().subscribe((confirmDelete: boolean) => {

    if(confirmDelete) {
      console.log("delete student: ");
      this.baseService.deleteStudent(student).subscribe(k=>
        this.baseService.getAllStudents().subscribe(data => this.students = data) );
    }
  });
}

}
