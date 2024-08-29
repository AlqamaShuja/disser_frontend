import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  adminForm:FormGroup;
  loginError: string = '';

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router, private toastr: ToastrService){
    this.adminForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }

  login(): void {
    if (this.adminForm.invalid) {
      this.loginError = 'Please fill in all required fields correctly.';
      this.toastr.error(this.loginError, 'Login Failed');
      return;
    }
    
    this.authService.adminLogin(this.adminForm.value).subscribe(
      (res: any) => {
        if (res.admin && res.token) {
          localStorage.setItem('admin', JSON.stringify(res.admin));
          localStorage.setItem('token', `Bearer ${res.token}`);
          this.router.navigate(['/admin']);
          this.toastr.success('Login successful', 'Welcome');
        } else {
          this.loginError = 'Login Failed: Invalid credentials';
          // this.toastr.error(this.loginError, 'Login Failed');
          alert('Invalid Credentials')
        }
      },
      (error: any) => {
        // this.loginError = `Login Failed: ${error}`;
        // this.toastr.error(this.loginError, 'Login Failed');
        alert('Invalid Credentials')
      }
    );
  }
  // login():void{
  //   if(this.adminForm.invalid){
  //     return ;
  //   }
  //   this.authService.adminLogin(this.adminForm.value).subscribe((res:any)=>{
  //     console.log(res, "===res;login;admin");
      
  //     if(res.admin && res.token){
  //       localStorage.setItem('admin',JSON.stringify(res.admin));
  //       localStorage.setItem('accessToken', 'Bearer ' + res.token);
  //       this.router.navigate(['/admin']);
  //     }
  //     else{
  //       alert("Login Failed invalid credientials")
  //     }
  //   })
  // }
}
