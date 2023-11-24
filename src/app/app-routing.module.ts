import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/home/login/login.component';
import { AdminComponent } from './components/home/admin/admin.component';
import { StudentComponent } from './components/home/student/student.component';
import { AuthGuard } from './auth/auth.guard';
import { TeacherComponent } from './components/home/teacher/teacher.component';

const routes: Routes = [ {
  path: '',
  component: HomeComponent,
  },
  {
  path: 'login',
  component: LoginComponent,
  },
    {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
    },
    {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard]
    },
    {
      path: 'teacher',
      component: TeacherComponent,
      canActivate: [AuthGuard]
      }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
