
import { SessionStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Credential } from './credential';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ROLE } from './role';
import { CredentialResponse } from './model/auth/credentialResponse';
import { Authority } from './model/auth/authority';
import { Student } from '../models/student';
import { Page } from '../service/page';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  private studentsUrl = 'api/home';
  private adminUrl = 'api/admin/users';
  private tUrl = 'api/teacher/users';

    private loggedIn = new BehaviorSubject<boolean>(false);


    constructor(
        private router: Router,
        private http: HttpClient,
        private sessionStorage: SessionStorageService
        ){
            const auth = this.sessionStorage.get('auth');
            this.loggedIn.next(this.isAuthNotEmpty(auth));
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    get LoggedUser(): CredentialResponse {
        const auth = this.sessionStorage.get('auth');

        if(auth == null || auth == "") {
            return new CredentialResponse();
    }

        return JSON.parse(auth);
    }

    isStudent(): boolean {
        return this.LoggedUser.authorities.filter((auth: Authority) => {
            return auth.authority == ROLE.STUDENT;
        }).length != 0;
    }

    isAdmin(): boolean {
        return this.LoggedUser.authorities.filter((auth: Authority) => {
            return auth.authority == ROLE.SUPER_USER;
        }).length != 0;
    }
    isTeacher(): boolean {
      return this.LoggedUser.authorities.filter((auth: Authority) => {
          return auth.authority == ROLE.TEACHER;
      }).length != 0;
  }

    static checkAuthUser(auth: CredentialResponse, role: string): boolean {
        let access = false;
        if (auth != null && auth.authorities !== null) {
            auth.authorities.some((el) => {
                access = el.authority === role;
                return access;
            });
        }
        return access;
    }

    static checkSection(url: string, section: string): boolean {
        return url.indexOf(section) == 0;
    }

    authenticate(crdls: Credential, failureHandler: any) {
        const headers = new HttpHeaders(crdls ? {
        authorization: 'Basic ' + btoa(crdls.username + ':' + crdls.password),
        "X-Requested-With": "XMLHttpRequest"
        } : {});

        console.log('authenticate ')
        this.authentication(headers).subscribe((data: CredentialResponse) => {
            if (data != null) {
                this.responseProcessing(data, failureHandler);
            }
        });
    }

    private responseProcessing(data: any, failureHandler: any) {
        const response: CredentialResponse = CredentialResponse.convertToObj(data);

        if(response.authenticated == true) {
            this.updateAuth(response);
            this.loggedIn.next(true);
            if(this.isAdmin())
            this.router.navigate(['admin']);
          else if(this.isTeacher())
          this.router.navigate(['teacher']);
            else
          this.router.navigate(['student']);
            return true;
        }
        else {
            failureHandler();
        }

        return false;
    }

    private updateAuth(response: CredentialResponse) {
        this.sessionStorage.set('auth', JSON.stringify(response));
    }


    getAllUsers(page: number, size: number,  sortColumn:string, sortDirection:string): Observable<Page<Student>> {
      // if(sortDirection == "user_id"){
      //   sortDirection = "asc";
      // }
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set("sortColumn", sortColumn)
        .set("sortDirection",sortDirection);


      return this.http.get<Page<Student>>('api/home/users', { params });
    }
    getAllUsersAdmin(page: number, size: number, sortColumn:string, sortDirection:string): Observable<Page<Student>> {

      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set("sortColumn", sortColumn)
        .set("sortDirection",sortDirection);

      return this.http.get<Page<Student>>('api/admin/users', { params });
    }
    getAllUsersTeach(page: number, size: number,sortColumn:string, sortDirection:string): Observable<Page<Student>> {
      // if(sortDirection == ""){
      //   sortDirection = "asc";
      // }
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set("sortColumn", sortColumn)
        .set("sortDirection",sortDirection);

      return this.http.get<Page<Student>>('api/teacher/users', { params });
    }
    getUser(): Observable<Student[]> {
         return this.http.get<Student[]>('api/admin/users').pipe();
       }
    // getAllStudents(): Observable<Student[]> {
    //   return this.http.get<Student[]>(this.studentsUrl);
    // }
      addNewUser(student: Student): Observable<Student> {
        console.log('addNewStudent');
        return this.http.post<Student>('api/admin/users', student).pipe();
      }
      addNewTUser(student: Student): Observable<Student> {
        console.log('addNewStudent');
        return this.http.post<Student>('api/teacher/users', student).pipe();
      }
      editUser(student: Student): Observable<Student> {
        console.log('editStudent');
        return this.http.put<Student>(`${this.adminUrl}/${student.user_id}`, student).pipe();
      }

      deleteUser(student: Student): Observable<Student> {
        console.log(student.user_id);
        return this.http.delete<Student>('api/admin/users/' + student.user_id).pipe();
      }
      deletteUser(student: Student): Observable<Student> {
        console.log(student.user_id);
        return this.http.delete<Student>('api/teacher/users/' + student.user_id).pipe();
      }

    logout() {
        this.clearLoginData();
        this.http.post('api/logout', {}).subscribe(response => {
            this.router.navigateByUrl('/login');
        });
    }

    logoutWithoutRedirect(){
        //Todo
    }

    clearLoginData() {
        this.loggedIn.next(false);
        this.sessionStorage.remove('auth');
    }

    authentication(headers: any): Observable<any> {
        return this.http.get('api/user', { headers: headers })
            .pipe(
                tap(data => console.log('login data:', data)),
                catchError(this.handleLoginError('login error', []))
            );
    }

    private isAuthNotEmpty = (auth: string) => {
        return auth != null && auth != "";
    };

    private handleLoginError<T>(operation = 'operation', result?: T) {
        console.log('handleLoginError');

        return (error: any): Observable<T> => {
            if(error.status === 401) {
                this.loggedIn.next(false);
                return of(result as T);
            }
            else if(error.status == 404) {
                this.loggedIn.next(false);
                // @ts-ignore
                return of (
                    {
                        errorStatus: error.status
                    }
                );
            }

            return of(result as T);
        };
    }
}
