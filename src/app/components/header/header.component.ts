import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedInUser:any;

  constructor(
    private globalService:GlobalService,
    private router:Router
    ){
    this.globalService.loggedIn$.subscribe((res)=>{
      if(res){
      this.loggedInUser = res;
      console.log(this.loggedInUser,'THE LOGGED USER')
    }else{
      this.loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')||""):"";
    }
    })
  }

  logout(){
    localStorage.clear();
    this.globalService.loggedIn$.next(null);
    this.router.navigate(['/']);

  }
}
