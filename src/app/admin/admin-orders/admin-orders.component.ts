import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent {
  orders: any[] = [];
  filteredOrders: any[] = [];
  orderStatus: any;
  orderBalance: any;
  pin: string = '';
  isSample: boolean = false;
  currentOrderSelection: string = 'Current';
  constructor(
    private orderService: OrderService,
    private globalService: GlobalService,
    private router: Router
  ) {
    if (this.router.url.includes('sample-orders')) {
      this.isSample = true;
    }
  }
  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((res) => {
      if (this.isSample) {
        // res.data.reverse()
        this.orders = res.data.filter(
          (element: any) => element.isSample === 1
        );
      } else {
        this.orders = res.data.filter(
          (element: any) => element.isSample === 0
        );
      }
      this.changeOrderFilterStatus(1);
    });

    this.orderService.deteletsideBarNotification('orders').subscribe((res) => {
      console.log(res)
    })
  }

  showOrderDetails(order: any): void {
    this.globalService.selectedOrder$.next(order);
    this.router.navigate(['/admin/order-details']);
  }

  sendInvoice(order: any, flag: any): void {
    this.orderService.sendInvoice(order.Id, flag).subscribe(
      (res) => {
        console.log(res);
        alert('Email sent');
      },
      (error) => {
        alert('Email sent');
      }
    );
  }

  updateOrderStatus(id: number, status: any): void {
    const payload = { id: id, Status: status };
    this.orderService.updateOrderStatus(payload).subscribe((res) => {
      console.log(res);
    });
  }

  updateOrderStatusWriter(id: number, writerID: any): void {
    const payload = { id: id, writer: writerID };
    this.orderService.updateOrderStatusWriter(payload).subscribe((res) => {
      console.log(res);
    });
  }

  deleteOrder(pin: string, id: number): void {
    if (pin === 'Office123') {
      this.pin = '';
      this.orderService.deleteOrder(id).subscribe((res) => {
        window.location.reload();
      });
    } else {
      alert('Wrong pin');
    }
  }

  updateBalance(id: number, balance: any): void {
    const payload = {
      Id: id,
      Balance: balance,
    };
    this.orderService.updateOrder(id, payload).subscribe((res) => {
      console.log(res);
    });
  }
  changeOrderFilterStatus(status: any): void {
    switch (status) {
      case 1:
        this.filteredOrders = this.orders.filter(
          (element) => element.Status === 'New'
        );
        this.currentOrderSelection = 'Current';
        break;
      case 2:
        this.filteredOrders = this.orders.filter(
          (element) => element.Status === 'Completed'
        );
        this.currentOrderSelection = 'Completed';
        break;
      case 3:
        this.filteredOrders = this.orders.filter(
          (element) => element.Status === 'Revision'
        );
        this.currentOrderSelection = 'Revision';
        break;
      case 4:
        this.filteredOrders = this.orders.filter(
          (element) => element.Status === 'Cancel'
        );
        this.currentOrderSelection = 'Cancel';
        break;
      case 5:
        this.filteredOrders = this.orders.filter(
          (element) => element.PaidStatus === 'Unpaid'
        );
        this.currentOrderSelection = 'Unpaid';
        break;
      default:
        this.filteredOrders = this.orders.filter(
          (element) => element.Status === 'New'
        );
        this.currentOrderSelection = 'Current';
        break;
    }
    this.filteredOrders;
  }

  formatDatabaseTimestamp(databaseTimestamp: string): string {
    // Convert the database timestamp to a JavaScript Date object
    const date = new Date(databaseTimestamp);

    // Options for formatting the date and time
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Use 12-hour format with AM/PM
    };

    // Format the date using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    // Extract the day of the month and add "th," "st," or "nd" as appropriate
    const day = date.getDate();
    let daySuffix = 'th';

    if (day === 1 || day === 21 || day === 31) {
      daySuffix = 'st';
    } else if (day === 2 || day === 22) {
      daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
      daySuffix = 'rd';
    }

    // Replace 'th' in the formatted date with the appropriate suffix
    const formattedDateWithSuffix = formattedDate.replace(/th/g, daySuffix);

    return formattedDateWithSuffix;
  }
  updateOrderPaidStatusChanged(id: any, status: any): void {
    const payload = { id: id, PaidStatus: status };
    this.orderService.updateOrderPaidStatus(payload).subscribe((res) => {
      console.log(res);
    });
  }

  updateGrossAmount(id: any, amount: any): void {
    const payload = { id: id, GrossAmount: amount };
    this.orderService.updateGrossAmount(payload).subscribe((res) => {
      console.log(res);
    });
  }

  updatePaymentMethod(orderId: number, paymentMethod: string) {
    // Implement the logic to update the payment method
  }
}
