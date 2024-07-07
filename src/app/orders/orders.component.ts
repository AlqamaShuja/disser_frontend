import { Component, OnInit } from '@angular/core';
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
  constructor(private orderService: OrderService,private globalService:GlobalService) {
    this.globalService.dataSubject$.subscribe((res)=>{
      if(res){
        this.orderRecieved = true;
        this.getOrderById(res.insertId);
      }
    })
  }
  ngOnInit(): void {
    this.orderService.getAllCategories().subscribe((res) => {
      this.categories = res.data;
    });
  }

  submitOrder(event: any): void {
    console.log(event);
    this.orderService.createOrder(event).subscribe((res) => {
      if (res.data) {
        this.orderService.sendOrderEail(res.data.insertId).subscribe((res:any)=>{
          alert('Order Submitted');
        })
        this.getOrderById(res.data.insertId);
      }
    });
  }

  getOrderById(id:Number):void{
    this.orderService
          .getOrderById(id)
          .subscribe((orderDetails) => {
            this.orderDetails = orderDetails.data[0];
            console.log(this.orderDetails);
            this.orderRecieved = true;
          });
  }
}
