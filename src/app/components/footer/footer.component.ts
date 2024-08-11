import { Component, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  @Input() services: any[] = [];
  topics: any[] = [];
  constructor(
    private router: Router,
    private globalService: GlobalService,
    private serviceService: ServicesService,
    private renderer: Renderer2
  ) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use 'smooth' for smooth scrolling, or 'auto' for instant scrolling
    });  }
    ngOnInit(): void {
      // console.log(this.services,"THE SERVICES TAP")
      this.getServices();
    }

    getServices(): void {
      this.serviceService.getAllTopic().subscribe((res: any) => {
        console.log(res, "===res:app.service");
        
        this.topics = res;
      });
    }
  
  getSevenServices(start: number, end: number): any[] {
    var topicsBrakdown: any[] = [];
    if (start < this.topics.length) {
      for (
        let i = start;
        i < (end < this.topics.length ? end : this.topics.length);
        i++
      ) {
        topicsBrakdown.push(this.topics[i]);
      }
      return topicsBrakdown;
    } else {
      return topicsBrakdown;
    }
  }

  selectService(blog: any): void {
    this.globalService.selectedService$.next(blog);
    this.router.navigate(['/services/' + blog['pageSlug']]);
  }
  companyLinks = [
    { title: 'Home', url: '/' },
    { title: 'About Us', url: '/about' },
    // blogs
    { title: 'Blogs', url: '/' },
    // categories
    { title: 'Categories', url: '/categories' },
    // contactus
    { title: 'Contact Us', url: '/' },
    // samples
    { title: 'Recent Queries', url: '/' },
    // services
    { title: 'Our Services', url: '/' },
    // sitemap
    { title: 'Sitemap', url: '/' },
    // Add more links as needed
  ];

  // address: `Smart Edu LTD, International House, 12
  // Constance Street, Royal Docks, London, E16 2DQ, United Kingdom`,
  contactInfo = {
    address:'UK',
    email: 'support@dissertationwriting.co.uk',
    phone: '+4458755888',
  };

  paymentMethods = [
    { name: 'Visa', icon: 'assets/images/visa.png' },
    { name: 'MasterCard', icon: 'assets/images/mastercard.png' },
    { name: 'PayPal', icon: 'assets/images/paypal.png' },
    // Add more payment methods as needed
  ];
}
