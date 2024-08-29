import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ServicesService } from './services/services.service';
import { LoadingService } from './services/loading.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Pro Assignments UK';
  services: any[] = [];
  isAdminLogin: boolean = false;
  isAdmin: boolean = false;
  isSidebarOpen = true;
  showFooter: boolean = true;
  whatsappNumber: string = '4473021548485454';

  constructor(
    private router: Router,
    private serviceService: ServicesService,
    public loadingService: LoadingService,
    private socketService: SocketService,
  ) {
    // this.onResize();
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const admin = localStorage?.getItem('admin');
        if(admin && !event.url.includes('/admin')){
          this.router.navigate(['/admin']);
        }
        if (event.url.includes('/admin')) {
          this.isAdmin = true;
          if (admin) {
            // var admin = JSON.parse(localStorage.getItem('admin') || "");
            this.isAdminLogin = true;
            (window as any).hideChat();
          } else {
            this.isAdminLogin = false;
            this.router.navigate(['/admin/login']);
          }
        } else {
          this.getServices();
          this.isAdmin = false;
        }
      }

      // Hide the footer when on the /user-details page
      if (event.url.includes('/user-details')) {
        this.showFooter = false;
      } else {
          this.showFooter = true;
      }

      (window as any).gotoOrderPage = this.gotoOrderPage.bind(this);
      (window as any).gotoAboutPage = this.gotoAboutPage.bind(this);
      (window as any).gotoLiveChat = this.gotoLiveChat.bind(this);
      (window as any).openWhatsApp = this.openWhatsApp.bind(this);
    });

     // Connect to the socket when the app initializes
     this.socketService.reconnect();

     // Example: Listening for new messages globally
     this.socketService.onMessage('newMessage').subscribe((message) => {
       console.log('New message received:', message);
       // Optionally, handle message display or notification here
     });
  }

  ngOnDestroy() {
    // Clean up the socket connection when the app is destroyed
    this.socketService.disconnect();
  }

  scrollTotTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use 'smooth' for smooth scrolling, or 'auto' for instant scrolling
    });
  }

  getServices(): void {
    this.serviceService.getAllTopic().subscribe((res: any) => {
      console.log(res, "===res:app.service");
      
      this.services = res;
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  mainComponentSt = this.isSidebarOpen ? {
    position: 'absolute',
    left: '241px',
    top: '0px',
    width: 'calc(100% - 241px)',
  } : {
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '100%',
  };

  // @HostListener('window:resize', ['$event'])
  // onResize(event?: Event): void {
  //   this.isSidebarOpen = window.innerWidth >= 1024;
  // }

  gotoOrderPage(): void {
    this.router.navigate(['/order'])
  }
  gotoAboutPage(): void {
    this.router.navigate(['/about'])
  }
  
  gotoLiveChat(): void {
    this.router.navigate(['/user-details'])
  }

  openWhatsApp(): void {
    // WhatsApp URL with phone number
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}`;
    
    // Optionally, add a pre-filled message
    const message = encodeURIComponent('Hello, Would you like to chat with Us!');
    const fullUrl = `${whatsappUrl}?text=${message}`;

    // Open the URL in a new tab
    window.open(fullUrl, '_blank');
  }
}


