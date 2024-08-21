import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  // private apiUrl = 'https://proassignmentbackend.smartedultd.co.uk/api/v1/';
  private apiUrl = BASEURL;
  // private apiUrl = 'https://dissertationbackend.dissertationwriting.help/api/v1/';

  constructor(private http: HttpClient) {}

  // Service Type
  getAllServices(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}services`);
  }

  addService(service: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}services`, service);
  }

  updateService(service: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}services/${service.id}`, service);
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}services/${id}`);
  }

  // Pages data 
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

  // Blogs Data
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
  
  updateTopic(id: number, payload: any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}topic/${id}`, payload);
  }
  
  createTopic(payload: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}topic`, payload);
  }
  
  deleteTopic(id: number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}topic/${id}`);
  }


  // Upload Files/Images API
  uploadContent(formData: FormData, id: number): Observable<any> {
    // Make a POST request to the server with the form data
    return this.http.put<any>(`${this.apiUrl}section/${id}`, formData);
  }

  // Section API
  // Get All
  getAllSectionData():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}section`);
  }

  // Get by id 
  getSectionDataById(id: number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}section/${id}`);
  }

  // FAQs
  getAllFAQs():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}faqs`);
  }
  
  updateMultiple(data: any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}faqs/update/multiple`, data);
  }
  
  
  // Update Sliders
  updateSlides(id: number, data: any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}section/slider/${id}`, data);
  }
  
  // Update Accordion
  updateAboutUsAccordion(id: number, data: any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}section/accordion/${id}`, data);
  }
  
  // COupons
  getAllCoupons():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}coupon`);
  }
  addCoupon(data: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}coupon`, data);
  }
  
  
  // Writer
  getAllWriters():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}writer`);
  }
  addWriter(data: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}writer`, data);
  }
  updateWriter(id: number, data: any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}writer/${id}`, data);
  }
  deleteWriter(id: number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}writer/${id}`);
  }


  // Academic Level
  getAllAcademicLevels(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}academic-level`);
  }

  addAcademicLevel(level: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}academic-level`, level);
  }

  updateAcademicLevel(level: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}academic-level/${level.id}`, level);
  }

  deleteAcademicLevel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}academic-level/${id}`);
  }

  // Subject Areas
  getAllSubjectAreas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}subject-area`);
  }

  addSubjectArea(area: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}subject-area`, area);
  }

  updateSubjectArea(area: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}subject-area/${area.id}`, area);
  }

  deleteSubjectArea(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}subject-area/${id}`);
  }

}
