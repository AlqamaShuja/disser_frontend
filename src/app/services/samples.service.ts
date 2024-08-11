import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SamplesService {

  // private apiUrl = 'https://proassignmentbackend.smartedultd.co.uk/api/v1/samples';
  // private apiUrl = 'https://dissertationbackend.dissertationwriting.help/api/v1/samples';
  private apiUrl = 'http://localhost:3000/api/v1/samples';
  private apiUrlOurSamples = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {}

  getSamples(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  getSamplesAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/amin-all`);
  }
  
  create(payload:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`,payload);
  }

  update(payload:any,id:number): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}`,payload);
  }
  
  delete(id:number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getSampleBySlug(slug:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${slug}`);
  }
  getSampleByLevelTypeTopicAndCatPoint(level: string, type: string, topic: string, catPoint: string): Observable<any> {
    console.log(`${this.apiUrlOurSamples}level-samples/${level}/${type}/${topic}/${catPoint}`, "helloooooo");
    
    return this.http.get<any>(`${this.apiUrlOurSamples}level-samples/${level}/${type}/${topic}/${catPoint}`);
  }
}
