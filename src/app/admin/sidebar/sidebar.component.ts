import { Component, HostListener, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isNavbarOpen = false;
  isHovered = false;
  noOfOrders: number = 0;
  selected: string = 'Dashboard';
  isLargeScreen = window.innerWidth >= 992;
  @Input() isSidebarOpen: boolean = true;

  constructor(private router: Router, private orderService: OrderService) {
    setInterval(() => { this.sideBarNotification() }, 100000);
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedItem();
      }
    });
    this.updateSelectedItem();
    this.updateScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateScreenSize();
  }

  updateScreenSize(): void {
    this.isLargeScreen = window.innerWidth >= 992;
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  sideBarNotification(): void {
    this.orderService.sideBarNotification().subscribe((res) => {
      console.log(res, "===res:sideBarNotification");
      
      if (res['data'].length > 0) {
        res['data'].map((element: any) => {
          if (element.type === 'orders') {
            this.noOfOrders = element.count;
          }
        });
      } else {
        this.noOfOrders = 0;
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/admin/login']);
  }

  selectedClass(value: string): string {
    return value === this.selected ? 'selectedSidebar' : '';
  }

  selectItem(value: string): void {
    this.selected = value;
  }

  updateSelectedItem(): void {
    let currentRoute = this.router.url.split('/').pop();
    console.log(currentRoute, "=currentRouteee");
    if(currentRoute?.includes("?")){
      currentRoute = currentRoute.split("?")[0]
    }
    
    switch (currentRoute) {
      case 'orders':
        this.selected = 'Orders';
        break;
      case 'order-details':
        this.selected = 'Orders';
        break;
      case 'conversation':
        this.selected = 'Orders';
        break;
      case 'sample-orders':
        this.selected = 'Sample Orders';
        break;
      case 'text-pages':
        this.selected = 'Text Page';
        break;
      case 'coupons':
        this.selected = 'Coupons';
        break;
      case 'manage-writer':
        this.selected = 'Manage Writer';
        break;
      case 'order-form-manage':
        this.selected = 'Order Form Manage';
        break;
      case 'chat':
        this.selected = 'Conversation';
        break;
      case 'topics':
        this.selected = 'Topic';
        break;
      case 'academic-level':
        this.selected = 'Academic Level';
        break;
      case 'category':
        this.selected = 'Categories';
        break;
      case 'samples':
        this.selected = 'Samples';
        break;
      case 'subject-area':
        this.selected = 'Subject Area';
        break;
      case 'inquiries':
        this.selected = 'Inquiries';
        break;
      case 'services':
        this.selected = 'Services';
        break;
      case 'blogs':
        this.selected = 'Blogs';
        break;
      case 'testimonials':
        this.selected = 'Testimonials';
        break;
      case 'manage-client':
        this.selected = 'Manage Clients';
        break;
      case 'inquiries':
        this.selected = 'Inquiries';
        break;
      case 'price-by-date':
        this.selected = 'Order Price By Day DIff';
        break;
      case 'change-password':
        this.selected = 'Change Password';
        break;
      default:
        if(this.router.url.includes("text-pages")){
          this.selected = 'Text Page';
        }
        else {
          this.selected = 'Dashboard';
        }
        break;
    }
  }

  showSidebar = this.isSidebarOpen ? {
    backgroundColor: '#254336',
    position: 'fixed',
    top: 0,
    left: 0,
  }: {
    display: 'none',
  }
}
