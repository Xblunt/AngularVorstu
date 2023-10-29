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


@NgModule({
  declarations: [
    AppComponent,
    StudentEditorComponent,
    TableStudentsComponent,
    DialogEditWrapperComponent,
    DialogEditComponent,
    DialogDeleteComponent,
    MatTableComponent
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
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [],
  bootstrap: [AppComponent]
  // entryComponents: [
  //   DialogEditWrapperComponent
  // ],

})
export class AppModule {

}
