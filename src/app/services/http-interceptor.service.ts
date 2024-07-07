import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor")  
    this.loadingService.startLoading();
      return next.handle(request).pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      );
  }
  
}
