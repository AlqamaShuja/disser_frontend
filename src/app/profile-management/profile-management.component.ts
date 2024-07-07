import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.css'],
})
export class ProfileManagementComponent implements OnInit {
  orders: any[] = [];
  invoices: any[] = [];
  completedOrders: any[] = [];
  user: any;
  showOrder:boolean=true;
  showInvoices:boolean=false;
  showCompleted:boolean=false;
  showEditUser:boolean=false;
  showChangePassword:boolean=false;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '');
    if (this.user) {
      console.log("user presednt")
      this.orderService
        .getOrderByEmail(this.user.email)
        .subscribe((res: any) => {
          if (res.data.length > 0) {
            this.invoices = res.data;
            this.orders = res.data.filter(
              (element: any) => element.Status !== 'Completed'
            );
            this.completedOrders = res.data.filter(
              (element: any) => element.Status === 'Completed'
            );

            console.log("orders",this.orders)
            console.log("orders",this.invoices)
          }
        });
    }else{
      window.location.href = "/";
    }
  }

  showComponent(flag:any){
    if(flag === 'showOrder'){
      this.showOrder =true;
      this.showInvoices =false;
      this.showCompleted =false;
      this.showEditUser =false;
      this.showChangePassword =false;
    }else if(flag === 'showInvoices'){
      this.showOrder =false;
      this.showInvoices =true;
      this.showCompleted =false;
      this.showEditUser =false;
      this.showChangePassword =false;
    }else if(flag === 'showCompleted'){
      this.showOrder =false;
      this.showInvoices =false;
      this.showCompleted =true;
      this.showEditUser =false;
      this.showChangePassword =false;
    }else if(flag === 'showEditUser'){
      this.showOrder =false;
      this.showInvoices =false;
      this.showCompleted =false;
      this.showEditUser =true;
      this.showChangePassword =false;
    }else if(flag === 'showChangePassword'){
      this.showOrder =false;
      this.showInvoices =false;
      this.showCompleted =false;
      this.showEditUser =false;
      this.showChangePassword =true;
    }else{

    }
  }

  updateProfile(event: any): void {
    this.authService.updateUser(event).subscribe((res) => {
      this.authService
        .loginUser({ email: this.user.email, password: this.user.password })
        .subscribe((res) => {
          this.user = res.data[0]
          localStorage.setItem('user', JSON.stringify(res.data[0]));
          alert('Profile updated');
        });
    });
  }
  logout(){
    localStorage.clear();
    // this.router.navigate(['/']);
    window.location.href = "/";
  }

  updatePassword(event:any):void{
    const payload = {
      email:this.user.email,
      oldPassword:event.oldPassword,
      newPassword:event.newPassword
    }

    this.authService.updateUserPassword(payload).subscribe((res)=>{
      console.log(res);
      if(res.data.changedRows > 0){
        alert('Password updated!');
      }else{
        alert('Failed to update password!');
      }
    })
  }
}
