
import { Student } from 'src/app/models/student';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DialogEditWrapperComponent } from '../student-editor/components/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { DialogEditComponent } from '../student-editor/components/dialog-edit/dialog-edit.component';
import { DialogDeleteComponent } from '../student-editor/components/dialog-delete/dialog-delete.component';


@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']

})
export class MatTableComponent  implements  AfterViewInit {

  displayedColumns: string[] = ['id', 'fio', 'group', 'phoneNumber', 'action'];
  dataSource = new MatTableDataSource<Student>([]);

  constructor(private baseService: BaseServiceService, private _liveAnnouncer: LiveAnnouncer,
    public dialog:MatDialog) {
      // this.baseService.getAllStudents().subscribe(data => this.dataSource = new MatTableDataSource(data));

    }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit(): void {
    // this.baseService.getAllStudents().subscribe(data => this.dataSource = new MatTableDataSource(data));
    this.baseService.getAllStudents().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}
  // announceSortChange(sortState: Sort) {
  //   if (sortState.direction) {
  //     //this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }
  addNewStudent() {
    const dialogAddingNewStudent = this.dialog.open(DialogEditWrapperComponent, {
      width: '700px',
      data: null
    });
    dialogAddingNewStudent.afterClosed().subscribe((result: Student) => {
      if(result != null) {
        console.log("adding new student: " + result.fio);
        this.baseService.addNewStudent(result).subscribe(k=>
          this.baseService.getAllStudents().subscribe(data => this.dataSource.data = data) );
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
          this.baseService.getAllStudents().subscribe(data => this.dataSource.data = data) );
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
          this.baseService.getAllStudents().subscribe(data => this.dataSource.data= data) );
      }
    });
  }

}
