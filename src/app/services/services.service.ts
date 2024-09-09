import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BASEURL } from 'src/globals';
import { map, filter, catchError } from 'rxjs/operators';

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
  getAllActieCoupons():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}coupon/active`);
  }
  addCoupon(data: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}coupon`, data);
  }
  updateCoupon(id: number, data: any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}coupon/${id}`, data);
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

  // Inquiries
  getAllInquiries(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}inquiries`);
  }

  createInquiries(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}inquiries`, data);
  }

  deleteInquiry(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}inquiries/${id}`);
  }

  updateInquiryStatus(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}inquiries/${id}`, data);
  }


  // OrderPriceByDateOrTimeDIff
  getAllOrderPrices(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}order-price-by-date`);
  }

  addOrderPrice(orderPrice: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}order-price-by-date`, orderPrice);
  }

  updateOrderPrice(orderPrice: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}order-price-by-date/${orderPrice.id}`, orderPrice);
  }

  deleteOrderPrice(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}order-price-by-date/${id}`);
  }

  // Desire Grades
  getAllGrades(): Observable<any> {
    return this.http.get(`${this.apiUrl}desired-grade`);
  }

  addGrade(grade: any): Observable<any> {
    return this.http.post(`${this.apiUrl}desired-grade`, grade);
  }

  updateGrade(grade: any): Observable<any> {
    return this.http.put(`${this.apiUrl}desired-grade/${grade.id}`, grade);
  }

  deleteGrade(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}desired-grade/${id}`);
  }

  // Refrence Style
  getAllStyles(): Observable<any> {
    return this.http.get(`${this.apiUrl}referencing-style`);
  }

  addStyle(style: any): Observable<any> {
    return this.http.post(`${this.apiUrl}referencing-style`, style);
  }

  updateStyle(style: any): Observable<any> {
    return this.http.put(`${this.apiUrl}referencing-style/${style.id}`, style);
  }

  deleteStyle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}referencing-style/${id}`);
  }

  // get user message
  getUserMessages(id: string, otherId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}message/${id}/${otherId}`);
  }

  updateMsgStatus(id: string, otherId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}message/${id}/${otherId}`, {});
  }

  // get new Msg Counts
  getNewMessagesCounts(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}message/${id}`);
  }

  // Upload file
  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}uploads`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      filter(event => event.type === HttpEventType.Response),
      map((event: any) => event.body)
    );
  }


  // Sub Services
  // Get all sub-services
  getAllSubServices(): Observable<any> {
    return this.http.get(`${this.apiUrl}subServices`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Add a new sub-service
  addSubService(subServiceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}subServices`, subServiceData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an existing sub-service
  updateSubService(subServiceData: any): Observable<any> {
    const url = `${this.apiUrl}subServices/${subServiceData.id}`;
    return this.http.put(url, subServiceData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a sub-service
  deleteSubService(subServiceId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}subServices/${subServiceId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('Server Error:', error);
    return throwError(error.message || 'Server error');
  }
}
