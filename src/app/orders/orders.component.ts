import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { OrderService } from '../services/order.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orderDetails: any;
  orderRecieved: boolean = false;
  categories: any = [];
  
  constructor(
    private orderService: OrderService,
    private globalService: GlobalService,
    private router: Router // Inject Router
  ) {
    this.globalService.dataSubject$.subscribe((res) => {
      if (res) {
        this.orderRecieved = true;
        this.getOrderById(res.insertId);
      }
    });
  }

  ngOnInit(): void {
    this.orderService.getAllCategories().subscribe((res) => {
      this.categories = res.data;
    });
  }

  submitOrder(event: any): void {
    console.log(event);
    this.orderService.createOrder(event).subscribe((res) => {
      console.log(res, '===res.data.orders');

      if (res.insertId) {
        this.orderService.sendOrderEail(res.insertId).subscribe((res: any) => {
          alert('Order Submitted');
        });
        this.getOrderById(res.insertId);
      }
    });
  }

  getOrderById(id: Number): void {
    this.orderService
      .getOrderById(id)
      .subscribe((orderDetails) => {
        this.orderDetails = orderDetails.data;
        console.log(this.orderDetails);
        this.orderRecieved = true;
        // Navigate to a specific route after fetching order details
        this.router.navigate([`/order/${id}`]);
      });
  }
}
