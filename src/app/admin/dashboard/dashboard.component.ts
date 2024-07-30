import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orders: any;
  orderCounts: { [status: string]: number } = {}; // Object to store counts based on status

  constructor(private orderService: OrderService, private globalService: GlobalService) {}

  ngOnInit(): void {
    this.getOrders(); 
  }

  getOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (res: any) => {
        this.orders = res.data;
        this.countOrders();
      },
      (error: any) => {
        console.error('Error fetching service data:', error);
      }
    );
  }

  countOrders(): void {
    // Initialize counts
    this.orderCounts = {
      New: 0,
      Complete: 0,
      Revision: 0,
      Cancel: 0,
      Unpaid: 0
      // Add more statuses as needed
    };

    // Count orders based on status
    this.orders.forEach((order: any) => {
      if (order.Status in this.orderCounts) {
        this.orderCounts[order.Status]++;
      }
      else {
        this.orderCounts[order.Status] = 1;
      }
    });

    console.log('Order counts:', this.orderCounts);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'New':
        // return 'bg-darkBlue';
        return 'bg-info';
      case 'Complete':
        return 'bg-success';
      case 'Revision':
        return 'bg-secondary';
      case 'Cancel':
        return 'bg-danger';
      case 'Unpaid':
        return 'bg-warning';
      default:
        return 'bg-primary';
    }
  }

  getOrderStatuses(): string[] {
    return Object.keys(this.orderCounts);
  }
}
