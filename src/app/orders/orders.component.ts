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
  showModal: boolean = false; // Control the visibility of the modal
  currentOrderId: number | null = null;

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
  
    // console.log("Setting showModal to true"); // Debugging
    // this.showModal = true;
  }

  submitOrder(event: any): void {
    console.log(event, '===event in submitOrder');
    this.orderService.createOrder(event).subscribe((res) => {
      console.log(res, '===res in submitOrder');
  
      if (res.insertId) {
        console.log('Setting currentOrderId and opening modal');
        this.currentOrderId = res.insertId;
        this.showModal = true; // Show the modal
      }
    });
  }
  // submitOrder(event: any): void {
  //   console.log(event);
  //   this.orderService.createOrder(event).subscribe((res) => {
  //     console.log(res, '===res.data.orders');

  //     if (res.insertId) {
  //       this.currentOrderId = res.insertId;
  //       this.showModal = true; // Show the modal
  //     }
  //   });
  // }

  getOrderById(id: number): void {
    this.orderService.getOrderById(id).subscribe((orderDetails) => {
      this.orderDetails = orderDetails.data;
      this.orderRecieved = true;
    });
  }

  closeModal(): void {
    this.showModal = false;
  }

  cancelOrder(): void {
    this.showModal = false;
    this.resetForm(); // Reset the form after canceling
  }

  checkout(): void {
    this.showModal = false;
    if (this.currentOrderId) {
      this.router.navigate([`/order/${this.currentOrderId}`]);
    }
  }

  resetForm(): void {
    this.globalService.dataSubject$.next(null); // Clear the form data
  }
}



























// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router'; // Import Router
// import { OrderService } from '../services/order.service';
// import { GlobalService } from '../services/global.service';

// @Component({
//   selector: 'app-orders',
//   templateUrl: './orders.component.html',
//   styleUrls: ['./orders.component.css'],
// })
// export class OrdersComponent implements OnInit {
//   orderDetails: any;
//   orderRecieved: boolean = false;
//   categories: any = [];
  
//   constructor(
//     private orderService: OrderService,
//     private globalService: GlobalService,
//     private router: Router // Inject Router
//   ) {
//     this.globalService.dataSubject$.subscribe((res) => {
//       if (res) {
//         this.orderRecieved = true;
//         this.getOrderById(res.insertId);
//       }
//     });
//   }

//   ngOnInit(): void {
//     this.orderService.getAllCategories().subscribe((res) => {
//       this.categories = res.data;
//     });
//   }

//   submitOrder(event: any): void {
//     console.log(event);
//     this.orderService.createOrder(event).subscribe((res) => {
//       console.log(res, '===res.data.orders');

//       if (res.insertId) {
//         this.orderService.sendOrderEail(res.insertId).subscribe((res: any) => {
//           alert('Order Submitted');
//         });
//         this.getOrderById(res.insertId);
//       }
//     });
//   }

//   getOrderById(id: Number): void {
//     this.orderService
//       .getOrderById(id)
//       .subscribe((orderDetails) => {
//         this.orderDetails = orderDetails.data;
//         console.log(this.orderDetails);
//         this.orderRecieved = true;
//         // Navigate to a specific route after fetching order details
//         this.router.navigate([`/order/${id}`]);
//       });
//   }
// }
