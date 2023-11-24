import { AuthService } from 'src/app/auth/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  // form: FormGroup;
  // lName: string;
  // lSurname: string;



  constructor(public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private baseService: BaseServiceService, private formBuilder: FormBuilder, private authservice: AuthService,) {

        this.editingStudent = data;

        // this.form = this.formBuilder.group({
        //   username: [data.student.username, Validators.required],
        //   name: [data.student.name, Validators.required],
        //   surname: [data.student.surname, Validators.required]
        // });

        // this.lName = this.editingStudent.name;
        // this.lSurname = this.editingStudent.surname;
        // this.editingStudent = { ...data };


    }

  ngOnInit(): void {
  }

    // editStudent() {
    //   this.baseService.editStudent(this.editingStudent);
    //   this.editingStudent = new Student();
    // }
    // onSaveClick(): void {
    //   if (this.form.valid) {
    //     const editedStudent: Student = {
    //       ...this.data.student,
    //       username: this.form.value.username,
    //       name: this.form.value.name,
    //       surname: this.form.value.surname
    //     };
    //     this.dialogRef.close(editedStudent);
    //   }
    // }
    // onYesClick(): void { this.dialogRef.close(this.editingStudent); }
    onYesClick() {
      this.dialogRef.close(this.editingStudent);}
  onNoClick(): void {
    // this.editingStudent.name = this.lName;
    // this.editingStudent.surname = this.lSurname;

    this.dialogRef.close();
    }


}
