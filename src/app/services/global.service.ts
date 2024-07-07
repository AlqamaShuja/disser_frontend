import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  submitOrder = new EventEmitter();
  dataSubject$ = new BehaviorSubject<any>(null);
  selectedOrder$ = new BehaviorSubject<any>(null);
  selectedBlog$ = new BehaviorSubject<any>(null);
  selectedService$ = new BehaviorSubject<any>(null);
  loggedIn$ = new BehaviorSubject<any>(null);
  checkout$ = new BehaviorSubject<any>(null);
  constructor() { }
}
