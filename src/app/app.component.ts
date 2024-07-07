import { Component, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ServicesService } from './services/services.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { LoadingService } from './services/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dissertation Writing UK';
  services: any[] = [];
  isAdminLogin:boolean = false;
  isAdmin: Boolean = false;
  constructor(
    private router: Router,
    private serviceService: ServicesService,
    public loadingService: LoadingService  ) {
  }

  ngOnInit(): void {
    
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/admin')) {
          this.isAdmin = true;
          if (localStorage.getItem('admin')) {
            var admin = JSON.parse(localStorage.getItem('admin')||"");
            this.isAdminLogin = true;
            (window as any).hideChat();
          } else {
            this.isAdminLogin = false;
            this.router.navigate(['/admin/login']);
          }
        }else{
          this.getServices();
          this.isAdmin = false;
        }
      }
    });
  }
  scrollTotTop():void{
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use 'smooth' for smooth scrolling, or 'auto' for instant scrolling
    });
  }
  getServices(): void {
    this.serviceService.getAllServices().subscribe((res: any) => {
      this.services = res.data;
    });
  }
}
