import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://proassignmentbackend.smartedultd.co.uk/api/v1/auth';

  constructor(private http: HttpClient) {}

  loginUser(payload:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`,payload);
  }
  adminLogin(payload:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin`,payload);
  }
  createUser(payload:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/register`,payload);
  }
  updateUser(payload:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/edit-profile`,payload);
  }
  
  updateUserPassword(payload:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/password-change`,payload);
  }
  
  delete(id:number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  
  getAllUsers(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  changePassword(payload:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin-password-change`,payload);
  }
}
