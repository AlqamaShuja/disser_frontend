
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit{
  selectedOrderForDetails:any;
  updateOrder:boolean = false;

  constructor(private globalService:GlobalService, private router: Router, private location: Location){}

  ngOnInit():void{
    
    this.globalService.selectedOrder$.subscribe((res)=>{
      console.log(res, "===this.globalService.selectedOrder");
      this.selectedOrderForDetails = res;
    })
  }

  goBack(): void {
    this.location.back(); // Use the Location service to navigate back
  }

  updateOrderDetails():void{
    this.updateOrder = true;
  }

  navigateToOrderPage():void{
    this.router.navigate(["/admin/orders"])
  }
}
