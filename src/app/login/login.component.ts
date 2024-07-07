import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private globalService: GlobalService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      console.log("HELLOADKASJD11")
      return;
    }
    this.authService.loginUser(this.loginForm.value).subscribe((res) => {
      if (res.data.length > 0) {
        localStorage.setItem('user', JSON.stringify(res.data[0]));
        this.globalService.loggedIn$.next(res.data[0]);
        this.router.navigate(['/user-details']);
      }else{
        this.loginError = true;
      }
    });
  }

  onSignIn():void {
    console.log("here")
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
    });
  }
}
