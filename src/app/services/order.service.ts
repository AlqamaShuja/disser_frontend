import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // private apiUrl = 'https://proassignmentbackend.smartedultd.co.uk/api/v1/';
  private apiUrl = BASEURL;
  // private apiUrl = 'https://dissertationbackend.dissertationwriting.help/api/v1/';

  constructor(private http: HttpClient) {}

  createOrder(payload:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}order`,payload);
  }
  
  updateOrderStatus(payload:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}order/updateorderstatus/${payload.id}`,payload);
  }
  updateOrderStatusWriter(payload:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}order/updatewriterorder/${payload.id}`,payload);
  }
  updateOrderPaidStatus(payload:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}order/updateorderpaidstatus/${payload.id}`,payload);
  }
  updateGrossAmount(payload:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}order/updategrossamount/${payload.id}`,payload);
  }
  
  updateOrder(id:number,payload:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}order/updateorder/${id}`,payload);
  }
  updateOrderDetails(payload:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}order/update`,payload);
  }
  
  deleteOrder(id:number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}order/${id}`);
  }
  getOrderById(id:Number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}order/${id}`);
  }
  getOrderByEmail(id:Number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}order/order-email/${id}`);
  }

  getAllOrders():Observable<any>{
    return this.http.get(`${this.apiUrl}order`);
  }
  getAllCategories():Observable<any>{
    return this.http.get(`${this.apiUrl}category`);
  }
  uploadDocuments(payload:any):Observable<any>{
    return this.http.post(`${this.apiUrl}upload/fileupload`,payload);
  }
  sendInvoice(id:number,flag:string):Observable<any>{
    return this.http.get(`${this.apiUrl}email/${id}?query=${flag}`);
  }
  sendOrderEail(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}email-order/${id}`);
  }

  createCategory(payload:any):Observable<any>{
    return this.http.post(`${this.apiUrl}catogery`,payload);
  }
  updateCategory(payload:any,id:number):Observable<any>{
    return this.http.put(`${this.apiUrl}catogery/${id}`,payload);
  }
  deleteCategory(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}catogery/${id}`);
  }
  
  
  sideBarNotification():Observable<any>{
    return this.http.get(`${this.apiUrl}order/sidebar-counts`);
  }
  deteletsideBarNotification(type:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}order/sidebar-counts/${type}`);
  }
}
