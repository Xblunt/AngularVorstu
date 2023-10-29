
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';
import { BaseServiceService } from 'src/app/service/base-service.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent  implements OnInit {
  // editingStudent: Student;
  // students: Student[];
  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private baseService: BaseServiceService) {


        // this.lName = this.editingStudent.name;
        // this.lSurname = this.editingStudent.surname;



    }
    ngOnInit(): void { }


    onNoClick(): void {
      this.dialogRef.close(false);
    }
    onYesClick(): void {
      this.dialogRef.close(true);
    }

}
