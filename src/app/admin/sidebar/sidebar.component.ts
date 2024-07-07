import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
isNavbarOpen = false;
isHovered = false;
noOfOrders:number = 0;
  constructor(private router:Router,private orderService:OrderService){
    setInterval(()=>{this.sideBarNotification()},100000);
  }
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  sideBarNotification():void{
    this.orderService.sideBarNotification().subscribe((res)=>{
      if(res['data'].length > 0){
      res['data'].map((element:any)=>{
        if(element.type === 'orders'){
          this.noOfOrders = element.count;
        }});
      }else{
        this.noOfOrders = 0;
      }
    })
  }

  logout():void{
    localStorage.clear();
    this.router.navigate(['/admin'])
  }

  
}
