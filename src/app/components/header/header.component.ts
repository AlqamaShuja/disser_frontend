import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedInUser:any;
  isDropdownOpen: boolean = false;
  myAccountDropdown: boolean = false;
  profileDropdown: boolean = false;
  coupons: any = []

  constructor(private globalService:GlobalService, private serviceService: ServicesService, private router:Router,){
    this.globalService.loggedIn$.subscribe((res)=>{
      if(res){
      this.loggedInUser = res;
      console.log(this.loggedInUser,'THE LOGGED USER')
    }else{
      this.loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')||""):"";
    }
    });

    this.serviceService.getAllActieCoupons().subscribe(res => {
      console.log(res, "====res:couponssssssssssssss");
      this.coupons = res.filter((cou: any) => cou.isShowToAll == true);;
    })
  }


  showDropdown() {
    this.isDropdownOpen = true;
  }

  hideDropdown() {
    this.isDropdownOpen = false;
  }
  
  toggleMyAccountDropdown() {
    this.myAccountDropdown = !this.myAccountDropdown;
  }
  
  profileDropdownDropdown() {
    this.profileDropdown = !this.profileDropdown;
  }


  logout(){
    localStorage.clear();
    this.globalService.loggedIn$.next(null);
    this.router.navigate(['/']);

  }
}
