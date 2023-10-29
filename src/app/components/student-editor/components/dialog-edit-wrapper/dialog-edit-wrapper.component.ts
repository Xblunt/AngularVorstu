import { Component, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';
import { BaseServiceService } from 'src/app/service/base-service.service';

@Component({
  selector: 'app-dialog-edit-wrapper',
  templateUrl: './dialog-edit-wrapper.component.html',
  styleUrls: ['./dialog-edit-wrapper.component.css']
})
export class DialogEditWrapperComponent implements OnInit {
  editingStudent: Student;

  constructor(public dialogRef: MatDialogRef<DialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private baseService: BaseServiceService) {

    }
  ngOnInit(): void {
    this.editingStudent = new Student();
  }
  addStudent() {
    this.baseService.addNewStudent(this.editingStudent);
    this.editingStudent = new Student();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
