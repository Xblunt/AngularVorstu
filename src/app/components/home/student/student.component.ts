import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {  MatSort, MatSortModule, Sort} from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/auth.service';
import { CredentialResponse } from 'src/app/auth/model/auth/credentialResponse';
import { Student } from 'src/app/models/student';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { Page } from 'src/app/service/page';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements  AfterViewInit{

    displayedColumns: string[] = ['user_id', 'name', 'surname', 'username' ];
    dataSource = new MatTableDataSource<Student>([]);
    currentPage: number = 0;
    pageSize: number = 2;
    // sortBy: string = 'id';
    sortBy: string = 'user_id';
    totalPages: number = 0;
    totalElements: number = 0;
    length!: number;
    user!: CredentialResponse;

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    this.user = this.authService.LoggedUser;
  }
  constructor(private baseService: BaseServiceService, private _liveAnnouncer: LiveAnnouncer,
    public dialog:MatDialog, private http: HttpClient, private authService:AuthService) {
      // this.baseService.getAllStudents().subscribe(data => this.dataSource = new MatTableDataSource(data));

    }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;


  ngOnInit(): void {

    this.getAllUser();
  }
    getAllUser(): void {
      this.authService.getAllUsers(this.currentPage, this.pageSize,  this.sort.active,this.sort.direction)
        .subscribe((page: Page<Student>) => {

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
      this.getAllUser();
    }
}
