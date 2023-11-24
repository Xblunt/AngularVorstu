
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

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements  AfterViewInit{
  displayedColumns: string[] = ['user_id', 'name', 'surname', 'username',   'action'];
  dataSource = new MatTableDataSource<Student>();
  currentPage: number = 0;
  pageSize: number = 2;
  // sortBy: string = 'id';
  sortBy: string = 'user_id';
  totalPages: number = 0;
  totalElements: number = 0;
  length!: number;
  user!: CredentialResponse;

 constructor(private baseService: BaseServiceService, private _liveAnnouncer: LiveAnnouncer,
    public dialog:MatDialog, private http: HttpClient, private authService:AuthService) {
      // this.baseService.getAllStudents().subscribe(data => this.dataSource = new MatTableDataSource(data));

    }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    this.user = this.authService.LoggedUser;
  }
  ngOnInit(): void {

    this.getAllUser();
  }
    getAllUser(): void {
      this.authService.getAllUsersTeach(this.currentPage, this.pageSize,  this.sort.active,this.sort.direction)
        .subscribe((page: Page<Student>) => {
          console.log(page);
          this.dataSource.data = page.content;

          this.totalPages = page.totalPages;


          this.totalElements = page.totalElements;



          this.dataSource.sort = this.sort;
// this.user = this.authService.LoggedUser;
// this.dataSource.paginator = this.paginator;
   // this.dataSource._updatePaginator(page.totalElements);
    // debugger;
          // this.currentPage = page.currentPage;
        });
      // this.authService.getUser().subscribe(data => this.dataSource.data = data);
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
          this.authService.addNewTUser(result).subscribe(k=>
            this.authService.getAllUsersTeach(this.currentPage, this.pageSize, this.sort.active,this.sort.direction).subscribe(data => this.dataSource.data = data.content) );
        }
      });
    }
    deletteUser(student: Student){
      const dialogAddingNewStudent = this.dialog.open(DialogDeleteComponent, {
        width: '700px',
        data: null
      });
       dialogAddingNewStudent.afterClosed().subscribe((confirmDelete: boolean) => {

        if(student != null) {
          console.log("delete student: ");
          this.authService.deletteUser(student).subscribe(k=>
            this.authService.getAllUsersTeach(this.currentPage, this.pageSize, this.sort.active,this.sort.direction).subscribe(data => this.dataSource.data= data.content) );
        }
      });
    }
}
