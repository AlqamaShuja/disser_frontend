import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  adminForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router){
    this.adminForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }

  login():void{
    if(this.adminForm.invalid){
      return ;
    }
    this.authService.adminLogin(this.adminForm.value).subscribe((res:any)=>{
      if(res.data && res.data.length>0){
        localStorage.setItem('admin',JSON.stringify(res.data[0]));
        this.router.navigate(['/admin']);
      }
      else{
        alert("Login Failed invalid credientials")
      }
    })
  }
}
