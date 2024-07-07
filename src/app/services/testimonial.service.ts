import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private apiUrl = 'https://proassignmentbackend.smartedultd.co.uk/api/v1/';

  constructor(private http: HttpClient) {}

  getAllServices():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}testimonials`);
  }
  
  getAllContact():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}contact`);
  }
  
  create(payload:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}testimonials`,payload);
  }
  createContact(payload:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}contact`,payload);
  }
  
  update(payload:any,id:number):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}testimonials/${id}`,payload);
  }
  delete(id:any):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}testimonials/${id}`);
  }
  deleteContact(id:any):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}contact/${id}`);
  }
}
