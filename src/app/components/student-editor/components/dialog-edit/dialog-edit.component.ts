import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';
import { BaseServiceService } from 'src/app/service/base-service.service';


@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})
export class DialogEditComponent implements OnInit {
  editingStudent: Student;
  // lName: string;
  // lSurname: string;


  constructor(public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student, private baseService: BaseServiceService) {

        this.editingStudent = data
        // this.lName = this.editingStudent.name;
        // this.lSurname = this.editingStudent.surname;



    }

  ngOnInit(): void {
  }

    // editStudent() {
    //   this.baseService.editStudent(this.editingStudent);
    //   this.editingStudent = new Student();
    // }
  onNoClick(): void {
    // this.editingStudent.name = this.lName;
    // this.editingStudent.surname = this.lSurname;
    this.dialogRef.close();
    }


}
