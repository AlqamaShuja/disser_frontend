import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private authService:AuthService,
    private router:Router
    ){
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone_number:['',Validators.required],
      name:['',Validators.required]
    });
  }
  onSubmit():void{
    if(this.registerForm.invalid){
      return;
    }
    this.authService.createUser(this.registerForm.value).subscribe(res => {
      if(res.data){
        console.log(res.data,'THE RES DATA')
        localStorage.setItem('user', JSON.stringify(res.data));
        this.globalService.loggedIn$.next(res.data);
        this.router.navigate(['/user-details']);
      }
      console.log(res);
    })
  }
}
