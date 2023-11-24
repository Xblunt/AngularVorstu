import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StudentEditorComponent } from './components/student-editor/student-editor.component';
import { TableStudentsComponent } from './components/table-students/table-students.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
// import { DialogEditWrapperComponent } from './components/student-editor/components/dialog-edit-wrapper/dialog-edit-wrapper.component';
import {MatInputModule} from '@angular/material/input';
import { DialogEditWrapperComponent } from './components/student-editor/components/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { DialogEditComponent } from './components/student-editor/components/dialog-edit/dialog-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './servise/in-memory-data.service';
import { DialogDeleteComponent } from './components/student-editor/components/components/dialog-delete/dialog-delete.component';
import { MatTableComponent } from './components/mat-table/mat-table.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SessionStorageService } from 'angular-web-storage';
import { BaseServiceService } from './service/base-service.service';
import { AdminComponent } from './components/home/admin/admin.component';
import { StudentComponent } from './components/home/student/student.component';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/home/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { TeacherComponent } from './components/home/teacher/teacher.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentEditorComponent,
    TableStudentsComponent,
    DialogEditWrapperComponent,
    DialogEditComponent,
    DialogDeleteComponent,
    MatTableComponent,
    AdminComponent,
    StudentComponent,
    HomeComponent,
    LoginComponent,
    TeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatButtonModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  // providers: [],
  providers: [BaseServiceService, SessionStorageService],
  bootstrap: [AppComponent]
  // entryComponents: [
  //   DialogEditWrapperComponent
  // ],

})
export class AppModule {

}
