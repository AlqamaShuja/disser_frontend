import { Component, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  @Input() services: any[] = [];
  constructor(
    private router: Router,
    private globalService: GlobalService,
    private renderer: Renderer2
  ) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use 'smooth' for smooth scrolling, or 'auto' for instant scrolling
    });  }
    ngOnInit(): void {
      console.log(this.services,"THE SERVICES TAP")
    }
  
  getSevenServices(start: number, end: number): any[] {
    var servicesBrakdown: any[] = [];
    if (start < this.services.length) {
      for (
        let i = start;
        i < (end < this.services.length ? end : this.services.length);
        i++
      ) {
        servicesBrakdown.push(this.services[i]);
      }
      return servicesBrakdown;
    } else {
      return servicesBrakdown;
    }
  }

  selectService(blog: any): void {
    this.globalService.selectedService$.next(blog);
    this.router.navigate(['/services/' + blog['pageSlug']]);
  }
  companyLinks = [
    { title: 'Home', url: '/' },
    { title: 'About Us', url: '/about' },
    { title: 'Blogs', url: '/blogs' },
    { title: 'Contact Us', url: '/contactus' },
    { title: 'Recent Queries', url: '/samples' },
    { title: 'Our Services', url: '/services' },
    { title: 'Sitemap', url: '/sitemap' },
    // Add more links as needed
  ];

  contactInfo = {
    address: `Smart Edu LTD, International House, 12
    Constance Street, Royal Docks, London, E16 2DQ, United Kingdom`,
    email: 'support@proassignments.co.uk',
    phone: '+447407692800',
  };

  paymentMethods = [
    { name: 'Visa', icon: 'assets/images/visa.png' },
    { name: 'MasterCard', icon: 'assets/images/mastercard.png' },
    { name: 'PayPal', icon: 'assets/images/paypal.png' },
    // Add more payment methods as needed
  ];
}
