import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { SocketService } from '../services/socket.service';

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
  showChat:boolean=false;
  newMsgCounts: any = {};

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private fileUploadService: ServicesService,
    private router:Router,
    private socketService: SocketService,
  ) {}

  ngOnInit(): void {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      this.user = JSON.parse(userInfo);
      console.log("user presednt")
      this.orderService
        .getOrderByEmail(this.user.email)
        .subscribe((res: any) => {
          console.log(res.data, "===res.data:getOrderByEmilId, ", this.user);
          
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

      this.fileUploadService.getNewMessagesCounts(this.user.uid).subscribe(res => {
        console.log(res, '+=acmakcakca:newMsgggCounttssssss');
        // this.newMsgCounts = Object.keys(res).length;
        this.newMsgCounts = res;
      });

      this.socketService.onMessage('newMessage').subscribe((message: any) => {
        console.log(this.newMsgCounts, "=====newMsgCountssss");
        
        let msgCount = { ...this.newMsgCounts };
        msgCount[message.senderId] = (msgCount[message.senderId] || 0) + 1;
        this.newMsgCounts = msgCount; 
        console.log('Received new message:', message);
      });
    }else{
      window.location.href = "/";
    }
  }

  getObjectKeysLength(obj: any): number {
    return Object.keys(obj).length;
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

  showComponent(flag: string): void {
    this.showOrder = false;
    this.showInvoices = false;
    this.showCompleted = false;
    this.showEditUser = false;
    this.showChangePassword = false;
    this.showChat = false;
  
    if (flag === 'showOrder') {
      this.showOrder = true;
    } else if (flag === 'showInvoices') {
      this.showInvoices = true;
    } else if (flag === 'showCompleted') {
      this.showCompleted = true;
    } else if (flag === 'showEditUser') {
      this.showEditUser = true;
    } else if (flag === 'showChangePassword') {
      this.showChangePassword = true;
    } else if (flag === 'showChat') {
      this.showChat = true;
    }
  }
  
}
