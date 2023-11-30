import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { DialogDeleteComponent } from '../../student-editor/components/dialog-delete/dialog-delete.component';
import { DialogEditComponent } from '../../student-editor/components/dialog-edit/dialog-edit.component';
import { DialogEditWrapperComponent } from '../../student-editor/components/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { Page } from 'src/app/service/page';
import { AuthService } from 'src/app/auth/auth.service';
import { CredentialResponse } from 'src/app/auth/model/auth/credentialResponse';
import { AdminService } from 'src/app/service/admin.service';
import { StudentService } from 'src/app/service/student.service';
import { TeacherService } from './../../../service/teacher.service';

@Component({
  selector: 'app-triple',
  templateUrl: './triple.component.html',
  styleUrls: ['./triple.component.css']
})
export class TripleComponent implements  AfterViewInit {

    displayedColumns: string[] = ['user_id', 'name', 'surname', 'username',   'action'];
    dataSource = new MatTableDataSource<Student>();
    currentPage: number = 0;
    pageSize: number = 2;
    // active: string = 'user_id';
    sortColumn: string = 'user_id';
    sortDirection: string = 'asc';
    totalPages: number = 0;
    totalElements: number = 0;
    user!: CredentialResponse;
    service: any;



   constructor(private adminService: AdminService, private teacherService: TeacherService, private studentService: StudentService, private baseService: BaseServiceService, private _liveAnnouncer: LiveAnnouncer,
      public dialog:MatDialog, private http: HttpClient, public authService:AuthService) {
        // this.baseService.getAllStudents().subscribe(data => this.dataSource = new MatTableDataSource(data));

        if (this.authService.isAdmin()){
          this.service = this.adminService;
        }
        else if (this.authService.isStudent()){
          this.service = this.studentService;
        }
        else if (this.authService.isTeacher()){
          this.service = this.teacherService;
        }
      }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    ngAfterViewInit(): void {

      this.user = this.authService.LoggedUser;
    }
    ngOnInit(): void {

      this.getAllUser();
    }

    getAllUser(): void {

        this.service.getAllUsers(this.currentPage, this.pageSize, this.sortColumn, this.sortDirection)
          .subscribe((page: Page<Student>) => {
            console.log(page);
            this.dataSource.data = page.content;
            this.totalPages = page.totalPages;
            this.totalElements = page.totalElements;
            this.dataSource.sort = this.sort;
          });
    }
      updatePageSize(event: PageEvent): void {
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        this.getAllUser();
      }
      addNewStudent() {
        const dialogAddingNewStudent = this.dialog.open(DialogEditWrapperComponent, {
          width: '700px',
          data: null
        });
        dialogAddingNewStudent.afterClosed().subscribe((result: Student) => {

          if(result != null) {
            console.log("adding new student: " + result.name);
            this.service.addNewUser(result).subscribe((k:Student)=>
              this.service.getAllUsers(this.currentPage, this.pageSize,  this.sort.active,this.sort.direction).subscribe((data:Page<Student>) => this.dataSource.data = data.content) );
      }
        });
      }
      editUser(student: Student) {
        const dialogAddingNewStudent = this.dialog.open(DialogEditComponent, {
          width: '700px',
          data: {user_id: student.user_id, username: student.username,  name: student.name,  surname: student.surname}
        });
        dialogAddingNewStudent.afterClosed().subscribe((editedStudent: Student) => {

          if(editedStudent  != null) {
            console.log("edit student: " + student.name);
            this.service.editUser(editedStudent).subscribe((k:Student)=>
              this.service.getAllUsers(this.currentPage, this.pageSize,  this.sort.active,this.sort.direction).subscribe((data:Page<Student>) => this.dataSource.data = data.content) );
          }
        });
      }

      deleteUser(student: Student){
        const dialogAddingNewStudent = this.dialog.open(DialogDeleteComponent, {
          width: '700px',
          data: null
        });
         dialogAddingNewStudent.afterClosed().subscribe((confirmDelete: boolean) => {

          if(student != null) {
            console.log("delete student: ");
            this.service.deleteUser(student).subscribe((k:Student)=>
              this.service.getAllUsers(this.currentPage, this.pageSize, this.sort.active,this.sort.direction).subscribe((data:Page<Student>) => this.dataSource.data= data.content) );
          }
        });
      }
       // getAllUser(): void {
    //   if (this.authService.isAdmin()) {
    //     this.adminService.getAllUsersAdmin(this.currentPage, this.pageSize, this.sortColumn, this.sortDirection)
    //       .subscribe((page: Page<Student>) => {
    //         console.log(page);
    //         this.dataSource.data = page.content;
    //         this.totalPages = page.totalPages;
    //         this.totalElements = page.totalElements;
    //         this.dataSource.sort = this.sort;
    //       });
    //   }
    //   else if (this.authService.isStudent()) {
    //     this.studentService.getAllUsersStudent(this.currentPage, this.pageSize, this.sortColumn, this.sortDirection)
    //       .subscribe((page: Page<Student>) => {
    //         console.log(page);
    //         this.dataSource.data = page.content;
    //         this.totalPages = page.totalPages;
    //         this.totalElements = page.totalElements;
    //         this.dataSource.sort = this.sort;
    //       });
    //   }
    //   else if (this.authService.isTeacher()) {
    //     this.teacherService.getAllUsersTeacher(this.currentPage, this.pageSize, this.sortColumn, this.sortDirection)
    //       .subscribe((page: Page<Student>) => {
    //         console.log(page);
    //         this.dataSource.data = page.content;
    //         this.totalPages = page.totalPages;
    //         this.totalElements = page.totalElements;
    //         this.dataSource.sort = this.sort;
    //       });
    //   }
    // }

  }


