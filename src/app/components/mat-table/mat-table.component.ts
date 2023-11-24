
import { Student } from 'src/app/models/student';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DialogEditWrapperComponent } from '../student-editor/components/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { DialogEditComponent } from '../student-editor/components/dialog-edit/dialog-edit.component';
import { DialogDeleteComponent } from '../student-editor/components/dialog-delete/dialog-delete.component';
import { HttpClient } from '@angular/common/http';
import { Page } from 'src/app/service/page';
import { AuthService } from 'src/app/auth/auth.service';
import { CredentialResponse } from 'src/app/auth/model/auth/credentialResponse';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']

})
export class MatTableComponent  implements  AfterViewInit {

  // displayedColumns: string[] = ['id', 'fio', 'group', 'phoneNumber', 'action'];
  displayedColumns: string[] = ['id',  'name', 'surname', 'action'];
  dataSource = new MatTableDataSource<Student>();
  currentPage: number = 0;
  pageSize: number = 2;
  // sortBy: string = 'id';
  totalPages: number = 0;
  totalElements: number = 0;
  length!: number;
  sortBy: string = 'user_id';

  constructor(private baseService: BaseServiceService, private _liveAnnouncer: LiveAnnouncer,
    public dialog:MatDialog, private http: HttpClient, private authService:AuthService) {
      // this.baseService.getAllStudents().subscribe(data => this.dataSource = new MatTableDataSource(data));

    }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit(): void {
     //this.baseService.getAllStudents().subscribe(data => this.dataSource = new MatTableDataSource(data));
    // this.baseService.getAllStudents().subscribe(data => {
    //   this.dataSource = new MatTableDataSource(data);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  //   this.baseService.getAllStudents().subscribe(data => this.dataSource = new MatTableDataSource(data));
  //   const url = `/api/students?page=${this.paginator.pageIndex}&size=${this.paginator.pageSize}&sortBy=${this.sort.active}`;
  // this.http.get<any>(url)
  // this.baseService.getAllStudents(this.paginator.pageIndex,this.paginator.pageSize).subscribe((data:Page) => {
  //   // this.dataSource = new MatTableDataSource<Student>(data.content);
  //   this.dataSource.data = data.content;
  //   this.totalItems = data.totalElements;
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // });
  }
//   );
// }
// }
// getStudents() {
//   const url = `/api/students?page=${this.currentPage}&size=${this.pageSize}&sortBy=${this.sortBy}`;
//   this.http.get<any>(url).subscribe(data => {
//     this.dataSource.data = data.content;
//     this.totalItems = data.totalElements;
//   });
// }
ngOnInit(): void {

  this.getAllStudents();
}
  getAllStudents(): void {
    this.authService.getAllUsersAdmin(this.currentPage, this.pageSize,  this.sort.active,this.sort.direction)
      .subscribe((page: Page<Student>) => {
        console.log(page);
        this.dataSource.data = page.content;

        this.totalPages = page.totalPages;
        // debugger;
        // this.currentPage = page.currentPage;

        this.totalElements = page.totalElements;
        // this.dataSource._updatePaginator(page.totalElements);

        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });
  }

  updatePageSize(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllStudents();
  }
// onPageChange(event: PageEvent) {
//   this.pageSize = event.pageSize;
//   this.currentPage = event.pageIndex;
//   this.getAllStudents();
// }

// nextPage(): void {
//   debugger;
//   if (this.currentPage + 1 < this.totalPages) {
//     this.currentPage++;
//     this.getAllStudents();
//   }
// }

// previousPage(): void {
//   if (this.currentPage > 0) {
//     this.currentPage--;
//     this.getAllStudents();
//   }
// }
// // updatePageSize(): void {
//   if (this.currentPage % 2 === 0) {
//     this.pageSize = this.currentPage + 2;
//   } else {
//     this.pageSize = 2;
//   }
// }

// nextPage(): void {
//   if (this.currentPage + 1 < this.totalPages) {
//     this.currentPage++;
//     this.updatePageSize(event);
//     this.getAllStudents();
//   }
// }

// previousPage(): void {
//   if (this.currentPage > 0) {
//     this.currentPage--;
//     this.updatePageSize(event);
//     this.getAllStudents();
//   }
// }


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
        console.log("adding new student: " + result.name);
        this.baseService.addNewStudent(result).subscribe(k=>
          this.baseService.getAllStudents(this.currentPage, this.pageSize).subscribe(data => this.dataSource.data = data.content) );
      }
    });
  }
  editStudent(student: Student) {
    const dialogAddingNewStudent = this.dialog.open(DialogEditComponent, {
      width: '700px',
      // data: {id: student.id, fio: student.fio, group: student.group, phoneNumber: student.phoneNumber}
    data: {id: student.user_id, name:student.name, surname: student.surname}
    });
    dialogAddingNewStudent.afterClosed().subscribe((student: Student) => {
      // debugger
      if(student != null) {
      // debugger
        console.log("edit student: " + student.name);
        this.baseService.editStudent(student).subscribe(k=>
          this.baseService.getAllStudents(this.currentPage, this.pageSize).subscribe(data => this.dataSource.data = data.content) );
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
          this.baseService.getAllStudents(this.currentPage, this.pageSize).subscribe(data => this.dataSource.data= data.content) );
      }
    });
  }

}
