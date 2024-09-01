import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { OrderService } from 'src/app/services/order.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];
  writers: any[] = [];
  filteredOrders: any[] = [];
  orderStatus: any;
  orderBalance: any;
  pin: string = '';
  isSample: boolean = false;
  currentOrderSelection: string = 'Current';

  constructor(
    private orderService: OrderService,
    private globalService: GlobalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceService: ServicesService
  ) {
    if (this.router.url.includes('sample-orders')) {
      this.isSample = true;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const status = params['status'];
      this.currentOrderSelection = status || 'Current';
      this.fetchOrders();
    });
    this.clearNotifications();
    this.fetchWriters();
  }

  fetchOrders(): void {
    this.orderService.getAllOrders().subscribe((res) => {
      this.orders = res.data;
      console.log(res.data, '===res.datares.data');

      if (this.isSample) {
        this.orders = this.orders.filter((element: any) => element.isSample === 1);
      } else {
        this.orders = this.orders.filter((element: any) => element.isSample === 0);
      }
      this.initializeSelectedWriters(); // Initialize selected writer for each order
      this.applyFilterBasedOnSelection();
    });
  }

  initializeSelectedWriters(): void {
    // Initialize selectedWriterId for each order based on writer_id
    this.orders.forEach(order => {
      order.selectedWriterId = order.writer_id || null; // Set initial selected writer
    });
  }

  fetchWriters(): void {
    this.serviceService.getAllWriters().subscribe((res) => {
      console.log(res, 'Fetched writers');
      this.writers = res.filter(
        (writer: any) => writer.role === 'Writer' && writer.status === 'Active'
      );
    });
  }

  clearNotifications(): void {
    this.orderService.deteletsideBarNotification('orders').subscribe((res) => {
      console.log(res);
    });
  }

  showOrderDetails(order: any): void {
    this.globalService.selectedOrder$.next(order);
    this.router.navigate(['/admin/order-details']);
  }

  sendInvoice(order: any, flag: any, msg: string): void {
    console.log(this.filteredOrders, " ====, this.filteredOrders, ", this.orders);
    
    this.orderService.sendInvoice(order.id, flag).subscribe(
      (res) => {
        this.filteredOrders = this.filteredOrders.map(o => {
          if(o.id === order.id) {
            const padSt = flag === 'invoice_sent_count' ? o.PaidStatus : o.last_invoice
            return { ...o, [flag]: (o[flag] || 0) + 1, last_invoice: padSt, };
          }
          return o;
        });
        console.log(res, " ====, this.filteredOrders, ", this.filteredOrders);
        alert(`${msg} send`);
      },
      (error) => {
        alert(`${msg} not sent`);
      }
    );
  }

  updateOrderStatus(id: number, status: any): void {
    const payload = { id: id, Status: status };
    this.orderService.updateOrderStatus(payload).subscribe((res) => {
      this.updateOrderInList(res.data);
      alert('Order status updated successfully.');
    });
  }

  updateOrderStatusWriter(orderId: number, writerId: any): void {
    if (!writerId) {
      alert('Please select a writer before assigning.');
      return;
    }

    const payload = { id: orderId, writer: writerId };
    this.orderService.updateOrderStatusWriter(payload).subscribe(
      (res) => {
        this.updateOrderInList(res.data);
        alert('Writer assigned successfully.');
      },
      (error) => {
        console.error('Error assigning writer:', error);
        alert('An error occurred while assigning the writer.');
      }
    );
  }

  deleteOrder(pin: string, id: number): void {
    if (pin === '2205') {
      this.pin = '';
      this.orderService.deleteOrder(id).subscribe((res) => {
        this.orders = this.orders.filter(order => order.id !== id);
        this.applyFilterBasedOnSelection();
        alert('Order deleted successfully.');
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

    this.orderService.updateOrder(id, payload).subscribe(
      (res) => {
        this.updateOrderInList(res.data);
        alert('Balance updated successfully.');
      },
      (error) => {
        console.error(error);
        if (error.status === 404 && error.error.message === 'Balance cannot be greater than GrossAmount') {
          alert('Error: Balance cannot be greater than GrossAmount.');
        } else {
          alert('An error occurred while updating the balance.');
        }
      }
    );
  }

  updateOrderInList(updatedOrder: any): void {
    const index = this.orders.findIndex(order => order.id === updatedOrder.id);
    if (index !== -1) {
      this.orders[index] = updatedOrder;
      this.orders[index].selectedWriterId = updatedOrder.writer_id; // Keep the writer updated
      this.applyFilterBasedOnSelection();  // Refresh the filtered view
    }
  }

  applyFilterBasedOnSelection(): void {
    switch (this.currentOrderSelection) {
      case 'Current':
        this.filteredOrders = this.orders.filter(element => element.Status === 'New');
        break;
      case 'Completed':
        this.filteredOrders = this.orders.filter(element => element.Status === 'Completed');
        break;
      case 'Revision':
        this.filteredOrders = this.orders.filter(element => element.Status === 'Revision');
        break;
      case 'Cancelled':
        this.filteredOrders = this.orders.filter(element => element.Status === 'Cancel');
        break;
      case 'Unpaid':
        this.filteredOrders = this.orders.filter(element => element.PaidStatus === 'Unpaid');
        break;
      default:
        this.filteredOrders = this.orders.filter(element => element.Status === 'New');
        this.currentOrderSelection = 'Current';
        break;
    }
  }

  changeOrderFilterStatus(status: number): void {
    switch (status) {
      case 1:
        this.currentOrderSelection = 'Current';
        this.filteredOrders = this.orders.filter(element => element.Status === 'New');
        break;
      case 2:
        this.currentOrderSelection = 'Completed';
        this.filteredOrders = this.orders.filter(element => element.Status === 'Completed');
        break;
      case 3:
        this.currentOrderSelection = 'Revision';
        this.filteredOrders = this.orders.filter(element => element.Status === 'Revision');
        break;
      case 4:
        this.currentOrderSelection = 'Cancelled';
        this.filteredOrders = this.orders.filter(element => element.Status === 'Cancel');
        break;
      case 5:
        this.currentOrderSelection = 'Unpaid';
        this.filteredOrders = this.orders.filter(element => element.PaidStatus === 'Unpaid');
        break;
      default:
        this.currentOrderSelection = 'Current';
        this.filteredOrders = this.orders.filter(element => element.Status === 'New');
        break;
    }

    // Update the URL with the new filter status
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { status: this.currentOrderSelection },
      queryParamsHandling: 'merge',
    });
  }

  formatDatabaseTimestamp(databaseTimestamp: string): string {
    const date = new Date(databaseTimestamp);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    const day = date.getDate();
    let daySuffix = 'th';

    if (day === 1 || day === 21 || day === 31) {
      daySuffix = 'st';
    } else if (day === 2 || day === 22) {
      daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
      daySuffix = 'rd';
    }

    const formattedDateWithSuffix = formattedDate.replace(/th/g, daySuffix);

    return formattedDateWithSuffix;
  }

  updateOrderPaidStatusChanged(id: any, status: any): void {
    const payload = { id: id, PaidStatus: status };
    this.orderService.updateOrderPaidStatus(payload).subscribe((res) => {
      this.updateOrderInList(res.data);
      alert('Paid status updated successfully.');
    });
  }

  updateGrossAmount(id: any, amount: any): void {
    const payload = { id: id, GrossAmount: amount };
    this.orderService.updateGrossAmount(payload).subscribe((res) => {
      this.updateOrderInList(res.data);
      alert('Gross amount updated successfully.');
    });
  }

  updatePaymentMethod(orderId: number, paymentMethod: string): void {
    this.orderService.updatePaymentMethod(orderId, paymentMethod).subscribe(
      (res) => {
        this.updateOrderInList(res.data);
        alert('Payment method updated successfully.');
      },
      (error) => {
        console.error('Error updating payment method:', error);
        alert('An error occurred while updating the payment method.');
      }
    );
  }
}

