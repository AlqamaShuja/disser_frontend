import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  // private apiUrl = 'https://proassignmentbackend.smartedultd.co.uk/api/v1/';
  private apiUrl = 'http://localhost:3000/api/v1/';
  // private apiUrl = 'https://dissertationbackend.dissertationwriting.help/api/v1/';

  constructor(private http: HttpClient) {}

  getAllServices():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}pages`);
  }

  getAllSingleServices(slug:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}pages/${slug}`);
  }
  
  create(payload:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}pages`,payload);
  }
  
  update(payload:any,id:number):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}pages/${id}`,payload);
  }
  
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}pages/${id}`);
  }

  getAllBlogs():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}blogs`);
  }
  
  getSitemap():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}blogs/sitemap`);
  }

  createBlog(payload:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}blogs`,payload);
  }
  updateBlog(payload:any,id:number):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}blogs/${id}`,payload);
  }
  deleteBlog(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}blogs/${id}`);
  }

  // Topic API
  getAllTopic():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}topic`);
  }
}
