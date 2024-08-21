import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BASEURL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${BASEURL}auth`;
  // private apiUrl = 'https://dissertationbackend.dissertationwriting.help/api/v1/auth';

  constructor(private http: HttpClient) {}

  loginUser(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  adminLogin(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin`, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  createUser(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/edit-profile`, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUserPassword(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/password-change`, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  changePassword(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin-password-change`, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // Server-side error
        errorMessage = error.error.message ? error.error.message : `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}
}
