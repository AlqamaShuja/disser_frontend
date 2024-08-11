import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  invoice: any;
  orderId: any;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router:Router,
    private globalService:GlobalService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.orderId = params.get('id');
    });
  }

  ngOnInit(): void {
    this.orderService.getOrderById(this.orderId).subscribe((res) => {
      var loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')||""):"";
      console.log(res.data,'THE IVOUICE:GetOrderById')
      if(loggedInUser.email === res.data.Email){
        this.invoice = res.data;
        console.log(this.invoice,'THE IVOUICE')
      }else{
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

  convertDate(date:any){
    return new Date(date).toLocaleString();
  }

  convertHTMLtoPDF() {
    let btn = document.getElementById("payNow");
    if (btn) {
      btn.style.display = 'none';
    }
    console.log('here')
    var doc = new jsPDF();
    var element = document.querySelector('#invoice-details');
    if (element) {
      const htmlElement = element as HTMLElement;
      doc.html(htmlElement, {
        callback: function (doc) {
          doc.save('invoice.pdf');
          if (btn) {
            btn.style.display = 'block';
          }
        },
        x: 20,
        y: 20,
        width: 170,
        windowWidth: 1080,
      });
    }
  }

  redirectToCheckout(invoice:any){
    this.globalService.checkout$.next(invoice);
    this.router.navigate(['/checkout']);
  }
}
