import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit{
  selectedOrderForDetails:any;
  updateOrder:boolean = false;

  constructor(private globalService:GlobalService){}

  ngOnInit():void{
    this.globalService.selectedOrder$.subscribe((res)=>{
      this.selectedOrderForDetails = res;
    })
  }
  updateOrderDetails():void{
    this.updateOrder = true;
  }
}
