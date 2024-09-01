import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-admin-order-price-by-date',
  templateUrl: './admin-order-price-by-date.component.html',
  styleUrls: ['./admin-order-price-by-date.component.css']
})
export class AdminOrderPriceByDateComponent implements OnInit {
  orderPrices: any[] = [];
  selectedOrderPrice: any = {};
  isEditMode: boolean = false;
  orderPriceModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private orderPriceService: ServicesService) {}

  ngOnInit(): void {
    this.loadOrderPrices();
  }

  loadOrderPrices() {
    this.orderPriceService.getAllOrderPrices().subscribe(res => {
      this.orderPrices = res;
    });
  }

  openOrderPriceModal(template: TemplateRef<any>, orderPrice: any = null): void {
    if (orderPrice) {
      this.isEditMode = true;
      this.selectedOrderPrice = { ...orderPrice }; // Clone the order price object
    } else {
      this.isEditMode = false;
      this.selectedOrderPrice = { title: '', min_day: '', max_day: '', price: '' };
    }
    this.orderPriceModalRef = this.modalService.show(template);
  }

  saveOrderPrice(): void {
    if (this.isEditMode) {
      // Update an existing order price
      this.orderPriceService.updateOrderPrice(this.selectedOrderPrice).subscribe(
        () => {
          this.loadOrderPrices();
          this.orderPriceModalRef?.hide();
          alert("Order Price Data Successfully Updated")
        },
        error => {
          console.error('Error updating order price:', error);
          alert("Error in updating Order Price Data " + error.message)
        }
      );
    } else {
      // Add a new order price
      this.orderPriceService.addOrderPrice(this.selectedOrderPrice).subscribe(
        () => {
          this.loadOrderPrices();
          this.orderPriceModalRef?.hide();
          alert("Order Price Data Successfully Updated");
        },
        error => {
          console.error('Error adding order price:', error);
          alert("Error in adding Order Price Data " + error.message);
        }
      );
    }
  }

  openDeleteModal(template: TemplateRef<any>, orderPrice: any): void {
    this.selectedOrderPrice = orderPrice;
    this.deleteModalRef = this.modalService.show(template);
  }

  confirmDelete(): void {
    this.orderPriceService.deleteOrderPrice(this.selectedOrderPrice.id).subscribe(
      () => {
        this.loadOrderPrices();
        this.deleteModalRef?.hide();
      },
      error => {
        console.error('Error deleting order price:', error);
      }
    );
  }
}