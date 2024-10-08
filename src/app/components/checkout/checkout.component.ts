import { Component, Input, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { GlobalService } from 'src/app/services/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @Input()
  orderDetails: any;
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean = false;

  constructor(
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.globalService.checkout$.subscribe((res) => {
      this.orderDetails = res;
      console.log(res, 'THE RESPONSE');
    });
  }

  ngOnInit(): void {
    this.initConfig();
    this.loadOrderDetails();
  }

  private loadOrderDetails(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    if (orderId) {
      this.orderService.getOrderById(orderId).subscribe(
        (order) => {
          this.orderDetails = order.data;
          console.log(order, 'Order Details');
        },
        (error) => {
          console.error('Error fetching order details', error);
        }
      );
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}















// import { Component, Input, OnInit } from '@angular/core';
// import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
// import { GlobalService } from 'src/app/services/global.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { OrderService } from 'src/app/services/order.service';


// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.css']
// })
// export class CheckoutComponent implements OnInit{
//   @Input()
//   orderDetails:any;
//   public payPalConfig?: IPayPalConfig;
//   showSuccess: boolean = false;

//   constructor(private globalService:GlobalService){
//     this.globalService.checkout$.subscribe((res)=>{
//       this.orderDetails = res
//       console.log(res,'THE RESPONSE')
//     })
//   }

//   ngOnInit():void{
//     this.initConfig()
//   }
//   private initConfig(): void {
//     this.payPalConfig = {
//     currency: 'EUR',
//     clientId: 'sb',
//     createOrderOnClient: (data) => <ICreateOrderRequest>{
//       intent: 'CAPTURE',
//       purchase_units: [
//         {
//           amount: {
//             currency_code: 'EUR',
//             value: '9.99',
//             breakdown: {
//               item_total: {
//                 currency_code: 'EUR',
//                 value: '9.99'
//               }
//             }
//           },
//           items: [
//             {
//               name: 'Enterprise Subscription',
//               quantity: '1',
//               category: 'DIGITAL_GOODS',
//               unit_amount: {
//                 currency_code: 'EUR',
//                 value: '9.99',
//               },
//             }
//           ]
//         }
//       ]
//     },
//     advanced: {
//       commit: 'true'
//     },
//     style: {
//       label: 'paypal',
//       layout: 'vertical'
//     },
//     onApprove: (data, actions) => {
//       console.log('onApprove - transaction was approved, but not authorized', data, actions);
//       actions.order.get().then((details: any) => {
//         console.log('onApprove - you can get full order details inside onApprove: ', details);
//       });
//     },
//     onClientAuthorization: (data) => {
//       console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
//       this.showSuccess = true;
//     },
//     onCancel: (data, actions) => {
//       console.log('OnCancel', data, actions);
//     },
//     onError: err => {
//       console.log('OnError', err);
//     },
//     onClick: (data, actions) => {
//       console.log('onClick', data, actions);
//     },
//   };
//   }
// }
